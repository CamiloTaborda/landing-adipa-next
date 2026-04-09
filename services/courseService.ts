import { Course } from "@/types";
import { courses as mockCourses } from "@/data/courses";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCourses(): Promise<Course[]> {
  await delay(500);

  return mockCourses;
}