// import { getCommits } from "@/actions/commit";
// import { getRepoStats } from "@/actions/repo";
import { CommitStatusBadge } from "@/components/client/CommitStatusBadge";
import { ViewReadmeLink } from "@/components/client/ViewReadmeLink";
import { Button } from "@/components/ui/button";
import { PER_PAGE } from "@/constants";
import { demoCommits, demoRepoStats } from "@/demoData";
import { ArrowLeft, Calendar, GitBranch, Github, Star, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface RepoPageProps {
  params: Promise<{
    username: string;
    repo: string;
  }>;
  searchParams: Promise<{
    page_no: number | undefined;
  }>;
}

const RepoPage : React.FC<RepoPageProps> = async ({ params, searchParams }) => {
  const { username, repo } = await params;
  let { page_no } = await searchParams;
  if (!page_no) page_no = 1;
  else page_no = parseInt(page_no.toString());
  if (isNaN(page_no)) redirect(`/repos/${username}/${repo}?page_no=1`);
  // const {
  //   stargazers_count,
  //   forks_count,
  //   collaborators_count,
  //   updatedAt,
  //   commits_count,
  //   error
  // } = await getRepoStats(username, repo);
  const { stargazers_count, forks_count, collaborators_count, updatedAt, commits_count, error } = demoRepoStats;
  const totalPages = Math.ceil(commits_count / PER_PAGE);
  if (page_no > totalPages) redirect(`/repos/${username}/${repo}?page_no=${totalPages}`);
  else if (page_no < 1) redirect(`/repos/${username}/${repo}?page_no=1`);
  if (error) throw new Error(error);
  // const { commits, error : commitError } = await getCommits(username, repo, page_no);
  const commits = demoCommits.slice((page_no - 1) * PER_PAGE, page_no * PER_PAGE);
  // if (commitError) throw new Error(commitError);
  return (
    <div className="flex-grow flex flex-col gap-5 w-full max-w-[1450px] justify-start items-center p-5">
      <div className="flex justify-between items-center w-full p-3">
        <Link href={`/repos/${username}`}>
          <Button
            variant="ghost"
            className="flex justify-between gap-3 items-center"
          >
            <ArrowLeft size={24} />
            <span>Back to Repositories</span>
          </Button>
        </Link>
        <Link
          href={`https://github.com/${username}/${repo}`}
          target="_blank"
        >
          <Button
            variant="outline"
            className="flex justify-between gap-3 items-center"
          >
            <Github size={24} />
            <span>View on Github</span>
          </Button>
        </Link>
      </div>
      <div className="flex justify-between items-center w-full py-7 px-10 rounded-lg border-2 border-gray-100">
        <div className="flex flex-col justify-center items-start gap-2">
          <h2 className="text-2xl font-bold">{repo}</h2>
          <p className="text-sm text-gray-500" suppressHydrationWarning>Last updated {updatedAt?.toLocaleDateString()}</p>
        </div>
        <div className="flex justify-center items-center gap-7 text-gray-500 text-sm">
          <div className="flex justify-center items-center gap-3">
            <Star size={18} />
            <span>{stargazers_count}</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <GitBranch size={18} />
            <span>{forks_count}</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Users size={18} />
            <span>{collaborators_count}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <h3 className="text-2xl font-bold">Commits</h3>
        <div className="flex gap-3 justify-center items-center">
          {page_no > 1 && <Link href={`/repos/${username}/${repo}?page_no=${page_no - 1}`}>
            <Button
              variant="outline"
              className="flex justify-between gap-3 items-center"
            >
              <span>Previous</span>
            </Button>
          </Link>}
          <span>{page_no} of {totalPages}</span>
          {page_no < totalPages && <Link href={`/repos/${username}/${repo}?page_no=${page_no + 1}`}>
            <Button
              variant="outline"
              className="flex justify-between gap-3 items-center"
            >
              <span>Next</span>
            </Button>
          </Link>}
        </div>
      </div>
      <div className={`w-full flex flex-col gap-3 p-5 ${commits.length === 0 ? "" : "rounded-lg border-2 border-gray-100"}`}>
        {commits.length === 0 && <p className="text-gray-500 text-3xl text-center">Repository will be tracked from Now</p>}
        {commits.map((commit, index) => (
          <div key={commit.id} className={`w-full p-3 flex justify-between items-center ${index === 0 ? "" : "border-t-2 border-gray-100"}`}>
            <div className="space-y-2">
              <div className="flex gap-3 items-center">
                <CommitStatusBadge commit_id={commit.id} status={commit.status} />
                <p className="text-lg font-bold">{commit.message}</p>
              </div>
              <div className="flex gap-3 items-center text-sm text-gray-500">
                <Calendar size={18} />
                <span suppressHydrationWarning>{commit.updatedAt.toLocaleDateString()}</span>
              </div>
            </div>
            <ViewReadmeLink commit_id={commit.id} status={commit.status} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RepoPage;