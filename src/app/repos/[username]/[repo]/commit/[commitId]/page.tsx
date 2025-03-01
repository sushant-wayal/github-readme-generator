import { getCommit } from "@/actions/commit";
import { ReadMeViewer } from "@/components/client/ReadMeViewer";
import { Button } from "@/components/ui/button";
import { CommitStatus } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CommitReadmePageProps {
  params: Promise<{
    username: string,
    repo: string,
    commitId: string
  }>;
}

const CommitReadmePage : React.FC<CommitReadmePageProps> = async ({ params }) => {
  const { commitId } = await params;
  try {
    const { commit, error } = await getCommit(commitId);
    if (error) throw new Error(error);
    if (!commit) throw new Error("Commit not found");
    if (commit.status == CommitStatus.CHECKING) throw new Error("Commit is still being checked");
    if (commit.status == CommitStatus.GENERATING) throw new Error("Commit is still being generated");
    if (commit.status == CommitStatus.NO_CHANGES) throw new Error("No changes to commit");
    if (commit.status == CommitStatus.FAILED) throw new Error("Failed to fetch commit");
    return (
      <div className="flex-grow flex flex-col gap-5 w-full max-w-[1450px] justify-start items-center p-5">
        <div className="flex flex-row justify-between items-center w-full p-1 sm:p-3 border-b-2 border-gray-200">
          <Link href={`/repos/${commit.author.username}/${commit.repo.name}`}>
            <Button
              variant="ghost"
              className="flex justify-between gap-3 items-center text-lg"
            >
              <ArrowLeft size={24} />
              <span>Back</span>
            </Button>
          </Link>
          <div className="flex flex-col items-start justify-between">
            <h2 className="text-2xl font-bold">{commit.repo.name}</h2>
            <h3 className="text-sm text-gray-500"> README at commit: {commit.message} </h3>
          </div>
        </div>
        {commit.status == CommitStatus.UPDATED && <ReadMeViewer commitId={commitId} markdown={commit.markdown || ""} generating={false}/>}
      </div>
    )
  }
  catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error("An unexpected error occurred");
  }
}

export default CommitReadmePage;