import { Client } from "@/app/repository/[owner]/[repository]/client";
import { GithubRepository } from "@/app/repository/[owner]/[repository]/types";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/animated-modal";

interface Props {
  params: Promise<{
    owner: string;
    repository: string;
  }>;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function Home({ params }: Props) {
  const { owner, repository } = await params;

  // const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`, {
  //   headers: {
  //     Authorization: `token ${GITHUB_TOKEN}`,
  //     Accept: "application/vnd.github+json",
  //   },
  // });

  // if (!response.ok) {
  //   return <div>Error: {response.statusText}</div>;
  // }

  // const data: GithubRepository = await response.json();

  return (
    <>
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">Book your flight</span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">✈️</div>
        </ModalTrigger>

        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8"></h4>
          </ModalContent>
          <ModalFooter className="gap-4">
            <div className="w-full flex items-center h-[20vh] justify-center bg-red-500">{/* <Client repository={data} /> */}</div>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
}
