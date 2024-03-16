"use client";
import { lfont } from "@/utils/constants";
import "./style.css";

import Image from "next/image";
import { BsGithub } from "react-icons/bs";
import { FaBlog } from "react-icons/fa";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import SelfIntro from "@/components/SelfIntro";
import LoadingComponent from "@/components/LoadingComponent";
import { cn } from "@/utils/cn";

export default function Resume() {
  let [opened, setOpened] = useState(false);

  let [c, setc] = useState<ReactElement | null>(null);
  useEffect(() => {
    SelfIntro().then((value) => {
      setTimeout(
        () => {
          setc(value);
        },
        Math.random() * (1000 - 500) + 500,
      );
    });
  }, []);

  return c == null ? (
    <LoadingComponent></LoadingComponent>
  ) : (
    <div
      id="resume-div"
      className="w-[100vw] h-[100vh] flex justify-center items-center"
    >
      {/* self intro */}
      <div
        id="self-intro"
        className={cn(
          "flex flex-col self-intro absolute w-96 h-1/2 backdrop-blur-xl border rounded-3xl border-transparent justify-center items-center p-10 transition-all opacity-0",
          { "translate-x-1/2 opacity-100": opened },
        )}
      >
        {c}
      </div>

      {/* avatar */}
      <div
        className={cn(
          "grid grid-cols-1 resume backdrop-blur-xl border rounded-3xl border-transparent w-96 h-1/2 justify-center absolute",
          { "-translate-x-1/2": opened },
        )}
        onClick={() => setOpened(!opened)}
        id="resume"
      >
        <div className="avatar-image m-auto mt-12">
          <Image
            src="https://inmove-blog.oss-cn-hangzhou.aliyuncs.com/images/avatar.jpg"
            alt="avatar"
            width={150}
            height={150}
            className="rounded-full"
          ></Image>
        </div>
        <div
          className={`avatar-title ${lfont.className} text-orange-800 text-3xl text-center mt-20`}
        >
          <h3>Hello I&apos;m inmove</h3>
          <h3>Full Stack Programmer</h3>
        </div>
        <div className="intro-icons grid-cols-4 text-3xl text-center items-center">
          <div className="intro-icon">
            <Link
              href="https://github.com/lisper-inmove"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <BsGithub></BsGithub>
            </Link>
          </div>
          <div className="intro-icon">
            <Link
              href="https://inmove.top/site?c=Projects"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <FaBlog></FaBlog>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
