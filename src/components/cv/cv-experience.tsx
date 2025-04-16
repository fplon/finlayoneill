import {
  EXPERIENCE,
  Experience as ExperienceType,
} from "@/lib/constants/experience";
import { formatDateRange } from "@/lib/utils/date-format";

export function CvExperience(): JSX.Element {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 mb-4 pb-1 print:text-lg print:mb-2 print:pb-0.5">
        PROFESSIONAL EXPERIENCE
      </h2>
      <div className="space-y-5 print:space-y-2.5">
        {EXPERIENCE.map((exp: ExperienceType, index: number) => (
          <div key={index} className="break-inside-avoid">
            <div className="flex justify-between items-baseline print:mb-0.5">
              <h3 className="text-lg font-semibold text-gray-800 print:text-base">
                {exp.role}
              </h3>
              <p className="text-sm font-medium text-gray-500 print:text-xs">
                {formatDateRange(exp.startDate, exp.endDate)}
              </p>
            </div>
            <p className="text-md font-medium text-gray-600 mb-1 print:text-sm print:mb-0.5">
              {exp.company}
            </p>
            <p className="text-gray-700 text-sm mb-2 print:text-xs print:mb-1">
              {exp.description}
            </p>
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1 print:gap-0.5 print:mt-0.5">
                {exp.technologies.map((tech: string, techIndex: number) => (
                  <span
                    key={techIndex}
                    className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full print:text-[10px] print:px-1 print:py-0"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
