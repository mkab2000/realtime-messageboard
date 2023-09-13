import { useQuery, useQueryClient } from '@tanstack/react-query';
import { iPost } from '../interfaces';

async function fetchAllPostData() {
  const response = await fetch(
    'https://realtime-rebbit-backend.vercel.app/api/posts'
  );
  const json = await response.json();
  return json.data;
}
export function useGetAllPostQuery() {
  return useQuery(['allPosts'], fetchAllPostData, { staleTime: 0, refetchOnMount: true });
}
export function useUpdateAllPostQuery() {
  const queryClient = useQueryClient();

  const updatePostQueryData = (newData: iPost[]) => {
    queryClient.setQueryData(['allPosts'], newData);
  };

  return updatePostQueryData;
}

async function fetchSinglePostData(_id: string) {
  const response = await fetch('https://realtime-rebbit-backend.vercel.app/api/posts/' + _id);
  const json = await response.json();
  return json.data;
}
export function useGetSinglePostQuery(_id: string) {
  return useQuery(['singlePost', _id], () => fetchSinglePostData(_id), {staleTime: Infinity, refetchOnMount: true});
}
export function useUpdateSinglePostQuery(_id: string) {
  const queryClient = useQueryClient();

  const updatePostQueryData = (newData: iPost) => {
    queryClient.setQueryData(['singlePost', _id], newData);
  };

  return updatePostQueryData;
}
