

export const fetchUsers = async ({ pageParam }: { pageParam: number }) => {  
    return await fetch(`https://randomuser.me/api/?results=10&seed=alex&page=${pageParam}`)
    .then(async res => {            
        
       if(!res.ok) throw new Error("Request error")
                     
        return await res.json() 
      })  
      .then(res => {    
      const nextPage = Number(res.info.page) + 1
      return {
        users: res.results,
        nextPage
      }
    })
  }
