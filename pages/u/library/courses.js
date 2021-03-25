import React, { useEffect, useState } from "react";
import LibraryLayout from "../../../components/layouts/user/library";
import { getEnrolmentWithCourseId } from "../../../lib/index";
import Link from "next/link";
import Image from "next/image";
export default function UserCoursesPage() {
  const [enrolmentsData, setEnrolmentsData] = useState({
    enrolments: [],
    meta: [],
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getEnrolmentWithCourseId();
        setEnrolmentsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <LibraryLayout>
      {enrolmentsData.enrolments ? (
        <div className="grid grid-cols-12 text-center">
          {enrolmentsData.enrolments.map((enrolment) => {
            const { course } = enrolment;
            return (
              <>
                <div
                  className={`col-span-12 md:col-span-6 lg:col-span-6 mb-10 px-4 ${enrolment.finish_date ? 'opacity-70' : ""}`}
                  id={enrolment._id}
                >
                  <div className="rounded-md overflow-hidden relative">
                    <Image
                      className="object-cover object-center h-full w-full"
                      src="/course.png"
                      width="640px"
                      height="360px"
                      alt="Website hacking and prevention"
                    />
                    {enrolment.finish_date ? (
                      <span className="absolute px-2 py-1 rounded-md right-1 opacity-100 top-1 font-semibold uppercase bg-primary-500 border-2 border-white  text-white">
                        Completed
                      </span>
                    ) : (
                      <span className="absolute px-2 py-1 rounded-md right-1 top-1 font-semibold uppercase bg-secondary border-2 border-white  text-white">
                        Progress
                      </span>
                    )}
                  </div>

                  <Link href={`/learn/${course.slug}`}>
                    <a className="title-font text-2xl font-bold text-gray-800 mt-6 mb-3 dark:text-gray-100">
                      Python - Beginner to Advanced, Learn with Examples Course
                    </a>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        "Loading"
      )}
    </LibraryLayout>
  );
}
