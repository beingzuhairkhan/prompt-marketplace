import { getUser } from "@/actions/user/getUser";
import MarketPlaceRouter from "./_page";
import { getAllPrompts } from "@/actions/prompts/getAllPrompts";
import { Metadata } from "next";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ searchParams }: PageProps) => {
  // Ensure searchParams is awaited
  const resolvedSearchParams = await searchParams;

  const page = Array.isArray(resolvedSearchParams?.page) 
    ? resolvedSearchParams.page[0] 
    : resolvedSearchParams.page ?? "1";

  const pageNumber = parseInt(page, 10);
  
  const data = await getUser();
  const promptsData = await getAllPrompts(pageNumber);

  return (
    <div>
      <MarketPlaceRouter 
        user={data?.user} 
        isSellerExists={!!data?.shop} 
        promptsData={promptsData?.prompts}
        totalPrompts={promptsData?.totalPrompts}
      />
    </div>
  );
};

export default Page;
