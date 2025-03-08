export interface StudentActivity {
    studentId: string,       
    name: string,     
    githuburl: string,
    activityId: number       
    activityDate : Date,
    status : boolean
  }

export interface StudentActivityDto {
    studentId: string,               
    activityId: number
  }
