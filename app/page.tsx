import Header from "@/app/(editor)/Header";
import Editor from "./(editor)/Editor";
import Wallpaper from "./(editor)/Wallpaper";
import NoSpaceScroll from "@/components/ui/NoScrollSpace";

export default function Home() {
  return (
    <>
      <Wallpaper
        src={
          false
          // "https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
        }
      />
      <Header />
      <Editor />
      <NoSpaceScroll />
    </>
  );
}
