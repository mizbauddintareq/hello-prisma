interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  total?: number;
  data: T;
}

export function createApiResponse<T>(
  status: number,
  message: string,
  data: T,
  total?: number // Make the total argument optional
): ApiResponse<T> {
  return {
    status,
    success: true,
    message,
    total, // Include total in the response
    data,
  };
}
