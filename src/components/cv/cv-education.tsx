import {
  EDUCATION,
  Education as EducationType,
} from "@/lib/constants/experience";
import { formatDateRange } from "@/lib/utils/date-format";

export function CvEducation(): JSX.Element {
  return (
    <section className="mt-6 print:mt-4">
      <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 mb-4 pb-1 print:text-xl print:mb-2 print:pb-1">
        EDUCATION & QUALIFICATIONS
      </h2>
      <div className="space-y-4 print:space-y-2">
        {EDUCATION.map((edu: EducationType, index: number) => (
          <div key={index} className="break-inside-avoid">
            <div className="flex justify-between items-baseline print:text-sm">
              <h3 className="text-lg font-semibold text-gray-800 print:text-xl">
                {edu.degree}
                {edu.award && (
                  <span className="text-sm font-normal text-gray-600 print:text-sm">
                    {" "}
                    ({edu.award})
                  </span>
                )}
              </h3>
              <p className="text-sm font-medium text-gray-500 print:text-sm">
                {formatDateRange(edu.startDate, edu.endDate)}
              </p>
            </div>
            <p className="text-md text-gray-600 mb-1 print:text-sm print:font-normal print:mb-0.5">
              {edu.institution}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
