export interface Iinks {
    inks: Iink[]
  }
  
  export interface Iink {
    id: string,
    color: string,
    cost: number
  }
  
export  interface Iquestions {
    scenario_id : string,
    questions: Iquestion[]
  }

 export  interface Iquestion {
      layers: Ilayer[]
  }
  
 
  export interface Ilayer {
    color: string,
    volume: number
  }
  