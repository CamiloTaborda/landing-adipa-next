export interface Course {
  id: string;
  title: string;
  instructor: string;
  image: string;
  startDate: string;
  price: number;        
  discountPrice: number;   
  modality: "Online" | "En Vivo" | "Presencial";
  categoryId: string;
  slug: string;
  description: string;      
  rating: number; 
  hours: number;                
  programType: "Curso" | "Diplomado" | "Taller" | "Seminario";
  area: string;                  
  isTop10?: boolean;
  isPopular?: boolean;
  isNewRelease?: boolean;
  isFlashSale?: boolean;
  isPreLaunch?: boolean;
}