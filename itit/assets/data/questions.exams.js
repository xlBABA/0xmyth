/* ==========================================================================
   questions-exams.js
   Past-paper questions — midterm and final.

   Empty for now. Add objects here using exactly the same shape as
   questions-tutorials.js, with source set to "midterm" or "final":

   {
     id: "final-01",
     chapter: 4,
     source: "final",
     sourceLabel: "Final exam 2024",
     type: "mcq",
     question: "...",
     options: ["...", "...", "...", "..."],
     answer: 0,
     explanation: "Two to four sentences of proper written answer.",
     keyPoints: ["...", "..."]
   }

   quiz.js merges this array with TUTORIAL_QUESTIONS at runtime and copes
   fine with it being empty — the Midterm and Final filters simply return
   nothing until questions are added.
   ========================================================================== */

const EXAM_QUESTIONS = [];
