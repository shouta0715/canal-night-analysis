import fs from "fs";
import { Charts } from "@/components/charts";

type Data = {
  date: string;
  value: number;
};

const loadJsonData = async (): Promise<Data[][]> => {
  const currentPath = process.cwd();

  const files = fs.readdirSync(`${currentPath}/src/data`);

  const data = files.map((file) => {
    const content = fs.readFileSync(`${currentPath}/src/data/${file}`, "utf-8");

    return JSON.parse(content) as Data[];
  });

  return data;
};

export default async function Home() {
  const data = await loadJsonData();

  return <Charts data={data} />;
}
