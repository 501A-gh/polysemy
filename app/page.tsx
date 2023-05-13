"use client";
import Header from "../components/Header";
import Setting from "../components/Setting";
import Row from "../components/row/Row";
import Editor from "./(editor)/Editor";
import Wallpaper from "./(editor)/Wallpaper";

// import nlp from "compromise";

export default function Home() {
  return (
    <>
      <Wallpaper
        src={
          "https://images.unsplash.com/photo-1506202687253-52e1b29d3527?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=8"
        }
      />
      <Header>
        <Setting intent={"highlight"} />
      </Header>
      <Editor />
    </>
  );
}
