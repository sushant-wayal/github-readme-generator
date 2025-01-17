import { GenerateReadme } from "@/components/client/GenerateReadme";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-1 mt-4">
        <h1 className="text-4xl font-bold">README Generator</h1>
        <h3 className="text-lg text-gray-400">Generate and track README files for your GitHub repositories</h3>
        <p className="text-gray-500 text-xs">
          *Note: Big repositories may take a while to generate README files.
        </p>
      </div>
      <GenerateReadme />
    </div>
  );
}

export default HomePage;