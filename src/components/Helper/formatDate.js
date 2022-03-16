export const formatDate = (date) => {
      const year = date.getFullYear()
      const month = date.getMonth() + 1 
      const monthf = month.toLocaleString().padStart(2, '0')
      const day = date.getDate().toLocaleString().padStart(2, '0')
      
      return `${year}-${monthf}-${day}`
}

export const formatDay = (date) => new Date(date.replace(/[-]/g,'/'))