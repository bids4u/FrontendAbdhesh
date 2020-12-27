export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
   
  export const getExam = ()=>{
    const exam = localStorage.getItem('exam')
    if(exam) return exam;
    return false;
  }

  export const getExamResult = ()=>{
    const ExamResult = localStorage.getItem('ExamResult')
    if(ExamResult) return JSON.parse(ExamResult);
    return null;
  }
  export const removeExamResult =()=>{
    localStorage.removeItem('ExamResult') 
  }
  export const removeExam = ()=>{
    localStorage.removeItem('exam')
  }
  // return the token from the session storage
  export const getToken = () => {
    return localStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }