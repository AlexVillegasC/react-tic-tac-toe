import { useStudentActivity } from '../Hooks/useStudentActivity.ts';

export const AttendanceList = () => {
  const { activityError, students, isFetchingStudents } = useStudentActivity();

  // Evita errores si students está vacío o indefinido
  const formatDate = (timestamp : number) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        
        {/* Título principal */}
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Asistencia de Clase - {formatDate(Date.now())}
        </h1>
        <p className="text-gray-600 text-center mt-2">
          This page contains the list of attendance.
        </p>

        {/* Contenedor de la actividad */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold text-gray-800">
            Current Activity: Asistencia de Clase
          </h2>

          {/* Estados de carga y error */}
          {isFetchingStudents && (
            <p className="text-gray-500 mt-2">Loading activities...</p>
          )}
          {activityError && (
            <p className="text-red-500 mt-2">Error loading activities.</p>
          )}

          {/* Listado de estudiantes */}
          <ul className="mt-4 space-y-3">
            {students?.map((activity: any) => (
              <li
                key={activity.id}
                className="flex items-center space-x-4 border rounded p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {activity.githubUrl && (
                  <a
                    href={activity.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={`${activity.githubUrl}.png`}
                      alt="GitHub profile"
                    />
                  </a>
                )}
                <div>
                  <p className="text-gray-800 font-semibold">{activity.name}</p>
                  <p className="text-sm text-gray-500">ID: {activity.id}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
