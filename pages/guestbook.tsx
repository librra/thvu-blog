import Guestbook from "@/components/guestbook/Guestbook";
import siteMetadata from "@/data/siteMetadata";
import { PageSEO } from "@/components/SEO";
import Link from "next/link";
import PageViews from "@/components/metric/PageViews";
import { InferGetStaticPropsType } from "next";
import PageTitle from "@/components/PageTitle";
import prisma from "@/lib/prisma";
import { GuestBookEntry } from "@/lib/types/guestbook";
import CustomLink from "@/components/CustomLink";

export default function GuestbookPage({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Guestbook – ${siteMetadata.author}`}
        description={"Share some wisdom with my future visitors."}
      />
      <div className="flex flex-col justify-center items-start max-w-2xl pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>Guestbook</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 xl:text-xl">
          An artifact of the 90's webs. Leave a comment below for my future visitors. Feel free to
          write anything!
        </p>
      </div>
      <div className="flex flex-col item-center gap-4 pb-8">
        <Guestbook fallbackData={fallbackData} />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-dark">
        This page is inspired by{" "}
        <CustomLink href="https://leerob.io/guestbook">Lee Robinson's guestbook.</CustomLink>
      </p>
      <PageViews />
    </>
  );
}

export const getStaticProps = async () => {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: "desc",
    },
    select: { id: true, body: true, updated_at: true, user: true },
  });

  return {
    props: {
      fallbackData: entries.map<GuestBookEntry>((entry) => ({
        id: entry.id.toString(),
        body: entry.body,
        updated_at: entry.updated_at.toString(),
        user: {
          id: entry.user.id,
          name: entry.user.name,
          image: entry.user.image,
        },
      })),
    },
    revalidate: 60,
  };
};
