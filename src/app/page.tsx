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

export default function Resume() {
  let [opened, setOpened] = useState(false);
  function handleClick() {
    const selfIntroDom = document.getElementById("self-intro");
    const resumeDom = document.getElementById("resume");
    if (opened) {
      resumeDom && (resumeDom.style.transform = "translateX(0px)");
      if (selfIntroDom) {
        selfIntroDom.style.transform = "translateX(0px)";
        selfIntroDom.style.opacity = "0";
      }
      setOpened(false);
    } else {
      resumeDom && (resumeDom.style.transform = "translateX(-200px)");
      if (selfIntroDom) {
        selfIntroDom.style.transform = "translateX(200px)";
        selfIntroDom.style.opacity = "1";
      }
      setOpened(true);
    }
  }

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

  // Automatically call handleClick 2 seconds after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClick();
    }, 2000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return c == null ? (
    <LoadingComponent></LoadingComponent>
  ) : (
    <div id="resume-div" className="w-[100vw] h-[100vh]">
      <div className="overlay">
        <div
          id="self-intro"
          className="flex flex-col self-intro absolute w-96 h-1/2 backdrop-blur-xl border rounded-3xl border-transparent justify-center items-center opacity-0 p-10"
        >
          {c}
        </div>
        <div
          className="grid grid-cols-1 resume backdrop-blur-xl border rounded-3xl border-transparent w-96 h-1/2 justify-center absolute"
          onClick={() => handleClick()}
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
              <Link href="https://github.com/lisper-inmove">
                <BsGithub></BsGithub>
              </Link>
            </div>
            <div className="intro-icon">
              <Link href="https://inmove.top/site">
                <FaBlog></FaBlog>
              </Link>
            </div>
          </div>
        </div>
        {/*
        <div className="bubble-list">
          <div className="bubble">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
