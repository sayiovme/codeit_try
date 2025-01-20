"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


type Props = {
  children: React.ReactNode;
}

type NavItem = {
  label: string;
  href: string;
};


const navItemsLeft: NavItem[] = [
  { label: "홈", href: "#" },
  { label: "시리즈", href: "#" },
  { label: "그라운드", href: "#" },
  { label: "아엠뉴", href: "#" },
];

const navItemsRight: NavItem[] = [
  { label: "광고 제휴", href: "#" },
  { label: "검색", href: "#" },
  { label: "알림", href: "#" },
  { label: "로그인", href: "#" },
];

const navItemsIndex: NavItem[] = [
  { label: "전체", href:"#" },
  { label: "뉴닉", href:"#" },
  { label: "추천", href:"#" },
  { label: "팔로잉", href:"#" },
  { label: "경제", href:"#" },
  { label: "정치/사회", href:"#" },
  { label: "문화/트렌드", href:"#" },
  { label: "AI", href:"#" },

]

function NavIndex({children}:Props){
  return(
  <div className="sticky h-20 overflow-x-auto flex justify-between items-center gap-20 whitespace-nowrap text-gray-500">
    {children}
  </div>
  )
}
function NavLeftBar(){
  return(
    <div className="left-bar w-[70%] flex gap-10 py-2 items-center justify-start md:justify-start">
    <h2 className="font-extrabold text-xl text-black">NEWNEEK</h2>
    <div className="w-[50%] flex gap-5 hidden md:flex">
        {navItemsLeft.map((item) => (
        <a key={item.label} href={item.href} className="text-gray-500">
          {item.label}
        </a>
          ))}
    </div> 
  </div>
  )

}


type Post = {
  id: number;
  title: string;
};

type PostListProps = {
  posts: Post[];
};

function PostList({posts}:PostListProps) {
  return(
    <div>
    {posts.map((post) => (
      <div key={post.id}>
        <a
          href="#"
          className="h-full flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="sampleImg w-60 h-48 border-2 p-2"></div>
          <ul className="flex flex-col justify-between p-4 leading-normal">
            <li className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </li>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021
              so far, in reverse chronological order.
            </p>
          </ul>
        </a>
      </div>
    ))}
  </div>
  )
}





export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function getNews() {
    try{
      const response = await fetch("https://my-json-server.typicode.com/typicode/demo/db")
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
        //console.log(data.posts);
      })
    }
    catch{}
  }
  useEffect(() => {

    getNews();
  },[]);

  

  return (
    <div className="min-h-screen w-full h-full">
      <header className="max-w-screen-xl md:min-w-[1000px] mx-auto border-2 h-15 relative text-gray-500 text-sm"> {/* 창md일 때 헤더 사이즈가 1000px보다 작아지면 오른쪽 내용 잘림림 */}
        
      <div className="flex gap-5 py-2 px-5">
          <NavLeftBar></NavLeftBar>
          <div className="right-bar w-[30%] flex gap-10 py-2 justify-center items-center lg:overflow-hidden">
                {navItemsRight.map((item) => (
                      <a key={item.label} href={item.href} className="text-gray-500">
                        {item.label}
                </a>
                  ))}
          </div>
        </div>

          </header>


      <main className="mx-auto flex w-full min-h-screen max-w-screen-sm flex-1 flex-col md:border-x md:border-x-gray-100 md:px-9">
        <NavIndex>
            {navItemsIndex.map((item) => (
                  <a key={item.label} href={item.href} className="text-gray-500">
                    {item.label}
                  </a>
                ))}
        </NavIndex>
        <PostList posts={posts}></PostList>

      </main>
     
    </div>
  );
}
