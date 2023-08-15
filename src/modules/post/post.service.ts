import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GetAllPostResult {
  data: Post[];
  total: number;
}

const createPost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });

  return result;
};

/* const getAllPost = async (options: any): Promise<GetAllPostResult> => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  const take = parseInt(limit) || 10;
    const skip = ((parseInt(page) || 1) - 1) * take;

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      skip,
      take,
      include: {
        author: true,
        category: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "desc" },
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });

    const total = await tx.post.count();
    return {
      data: result,
      total,
    };
  });
}; */

const getAllPost = async (options: any): Promise<GetAllPostResult> => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  return await prisma.$transaction(async (tx) => {
    const take = parseInt(limit) || 10;
    const skip = ((parseInt(page) || 1) - 1) * take;

    const queryOptions: any = {
      skip,
      take,
      include: {
        author: true,
        category: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "desc" },
    };

    if (searchTerm) {
      queryOptions.where = {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      };
    }

    const result = await tx.post.findMany(queryOptions);

    const total = await tx.post.count();
    return {
      data: result,
      total,
    };
  });
};

const getSinglePost = async (id: number): Promise<Post | null> => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
};
