export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

export const EXPERIENCE: Experience[] = [
  // {
  //   role: "Founder",
  //   company: "Paradigmz",
  //   startDate: "01-08-2024",
  //   description:
  //     "Set up a Data & Digital Consutlancy aimed at helping clients unlock demonstrable value from their data on both internal and client-facing platforms.",
  //   technologies: [
  //     "Python",
  //     "SQL",
  //     "Typescript",
  //     "Next.Js",
  //     "React",
  //     "MongoDB",
  //   ],
  // },
  {
    role: "Data Engineer",
    company: "Aberdeen Investments",
    startDate: "03-2023",
    description:
      "Working within the Modelling & Quantitative Analytics department, tasked with democratising data across the company to ensure investment decision making is taken on the back of high-quality data sources. Also developed bespoke tools and dashboards.",
    technologies: [
      "Python",
      "SQL",
      "C#",
      "Azure",
      "Azure Data Factory",
      "Azure DevOps",
      "PowerBI",
      "TeamCity",
      "Snowflake",
      "Terraform",
      "Powershell",
    ],
  },
  {
    role: "Quantitative Developer",
    company: "Aberdeen Investments",
    startDate: "03-2022",
    endDate: "03-2023",
    description:
      "Based in the Quantitative Investment Solutions team, tasked with enhancing the portfolio analytics capabilities to understand the drivers of performance and exposure to risk factors. Specifically championed with developing capabilities to monitor portfolio changes ahead of trading.",
    technologies: [
      "Python",
      "SQL",
      "Azure",
      "PowerBI",
      "Bloomberg",
      "Factset",
      "Azure DevOps",
      "SFTP",
    ],
  },
  {
    role: "Data Engineer / Scientist",
    company: "Forecast Global",
    startDate: "01-2021",
    endDate: "03-2022",
    description:
      "Consultant role working on projects with clients of different industries and sizes - ranging from building data pipelines for a FTSE100 telecoms firm to classifying promising sales leads using machine learning models for a small FinTech.",
    technologies: [
      "Python",
      "SQL",
      "GCP",
      "BigQuery",
      "Airflow",
      "Tableau",
      "Docker",
      "DBT",
    ],
  },
  // {
  //   role: "Master's in Data Science Post Graduate",
  //   company: "University of Stirling",
  //   startDate: "09-2020",
  //   endDate: "09-2021",
  //   description:
  //     "Completed a Master's in Data Science with Distinction, focusing on machine learning and statistical methods.",
  //   technologies: ["Python", "SQL", "R", "Git"],
  // },
  {
    role: "Investment Risk Manager",
    company: "Aberdeen Investments",
    startDate: "04-2019",
    endDate: "11-2019",
    description:
      "Analytical role to monitor the risk profiles of Multi-Asset investment portfolios. Responsibility to develop new tooling to meet regulation and growing set of sophisticated investment types. Left to pursue MSc in Data Science.",
    technologies: [
      "Python",
      "SQL",
      "R",
      "Git",
      "Excel VBA",
      "Microsoft SQL Server",
      "Bloomberg",
    ],
  },
  {
    role: "Investment Specialist",
    company: "Aberdeen Investments",
    startDate: "09-2016",
    endDate: "04-2019",
    description:
      "Designed reporting tools to monitor the performance of Multi-Asset investment portfolios, competitor analysis and macroeconomic data.",
    technologies: [
      "Excel VBA",
      "SQL",
      "Microsoft SQL Server",
      "Bloomberg",
      "Salesforce",
      "Microsoft SharePoint",
    ],
  },
  {
    role: "Investment Accountant",
    company: "Baillie Gifford",
    startDate: "04-2014",
    endDate: "09-2016",
    description:
      "Automation of investment portfolio transaction reporting and reconcilations with custody banks",
    technologies: ["Excel VBA", "SQL", "Microsoft Access"],
  },
];
