import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchCurrentActivityId,
  fetchStudentsByActivity,
  saveStudentActivity,
} from '../Services/StudentService';
import { StudentActivityDto } from '../DTOs/StudentActivity';

// Custom hook to manage student activity data
export const useStudentActivity = () => {
  const queryClient = useQueryClient();

  // 1️⃣ Fetch the current activity ID
  const { data: { id: activityId, courseName } = {}, isLoading: isFetchingActivity, error: activityError } = useQuery({
    queryKey: ['currentActivityId'],
    queryFn: fetchCurrentActivityId,
    staleTime: 60000, // Cache the activity ID for 1 minute
  });

  // 2️⃣ Fetch students by activity ID (dependent query)
  const {
    data: students,
    isLoading: isFetchingStudents,
    error: studentsError,
  } = useQuery({
    queryKey: ['studentsByActivity', activityId],
    queryFn: () => (activityId > 0 ? fetchStudentsByActivity(activityId) : Promise.resolve([])), // Fetch only if activityData is available
    enabled: !!activityId, // Runs only when activityData is available
    staleTime: 60000,
  });

  // 3️⃣ Mutation to save student activity
  const mutation = useMutation({
    mutationFn: (student: StudentActivityDto) => saveStudentActivity(student),
    onSuccess: () => {
      console.log('Student activity saved successfully!');      
      queryClient.invalidateQueries({ queryKey: ['studentsByActivity'] });
    },
    onError: (error) => {
      console.error('Error saving student activity:', error);      
    },
  });

  return {
    activityId,
    courseName,
    isFetchingActivity,
    activityError,
    students: students ?? [],
    isFetchingStudents,
    studentsError,
    saveActivity: mutation.mutate, 
    isSaveSuccess: mutation.isSuccess,
    isSaveLoading: mutation.isPending,   
  };
};
