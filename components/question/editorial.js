import React from "react";
import MarkDownParser from "../utils/mdParser";
export default function Editorial({ editorial }) {
  return (
    <section className="my-10 prose dark:prose-dark prose-lg px-4 max-w-none">
      <MarkDownParser>{editorial}</MarkDownParser>
    </section>
  );
}
