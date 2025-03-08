import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStudentActivity } from '../Hooks/useStudentActivity';
import { StudentActivityDto } from '../DTOs/StudentActivity';

// Validation Schema
const studentIdSchema = z.object({
  studentId: z.string().refine((id) => {
    const numericId = id.replace(/\D/g, '');
    return /^\d{9}$/.test(numericId) || /^\d{11,12}$/.test(numericId);
  }, {
    message: 'Invalid Student ID. Must be 9 digits (local) or 11-12 digits (international).',
  }),
});

type StudentIdFormData = z.infer<typeof studentIdSchema>;

const StudentForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<StudentIdFormData>({
    resolver: zodResolver(studentIdSchema),
  });

  // Use the student activity hook
  const { saveActivity, activityId, courseName, isFetchingActivity, isSaveLoading, isSaveSuccess } = useStudentActivity();
  
  const onSubmit = (data: StudentIdFormData) => {
  
    const studentData: StudentActivityDto = {    
        studentId: data.studentId,
        activityId: activityId
    }  

    saveActivity(studentData);
  };


  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">{courseName}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-gray-700">Cédula:</label>
        <input
          type="text"
          {...register('studentId')}
          className="w-full p-2 border rounded mt-1"
        />
        {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId.message}</p>}

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          disabled={isFetchingActivity}
        >
          {isSaveLoading ? 'Enviando...' : 'Presente!'}
        </button>
      </form>  
      
    {isSaveSuccess && (
       <p className="mt-4 text-green-600">Anotado! ✅</p>
    )}

      <div>
        <br/>
        <img className="w-1/2 mx-auto bg-gray-200 p-4"
          src="https://i.postimg.cc/4x3BQg66/01939b2b-6a80-40b9-a307-26944f47d71d.jpg"
          alt="WhatsApp Blob Image"
        />
      </div>
    
    </div>
  );
};

export default StudentForm;
