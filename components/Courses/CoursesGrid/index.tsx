"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Course } from "@/types";
import CourseCard from "../CourseCard";
import { STAGGER_CONTAINER, APPLE_CARD_VARIANTS } from "@/animations/courseAnimations";

interface Props {
  courses: Course[];
}

export default function CoursesGrid({ courses }: Props) {
  return (
    <motion.div
      variants={STAGGER_CONTAINER}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <AnimatePresence mode="popLayout">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            layout 
            variants={APPLE_CARD_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}