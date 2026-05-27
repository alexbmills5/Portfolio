"use client";
import { useState } from "react";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import { scroller } from "react-scroll";
import { 
  PiBriefcaseBold, 
  PiFileJsx, 
  PiFileSql, 
  PiFileTsx, 
  PiFolderBold, 
  PiGithubLogo, 
  PiHouseBold,
  PiUserBold, 
  PiWrenchBold
} from "react-icons/pi";
import {
  SiAmazonaws,
  SiGithubactions,
  SiMicrosoftazure,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
} from "react-icons/si";
import { TbBrandCSharp, TbBrandPython } from "react-icons/tb";
import { Syne } from "next/font/google";
import { Button, Card, CardBody, CardHeader, Code, Input, Modal, ModalContent, Textarea, Tooltip, useDisclosure } from "@nextui-org/react";
import Logo from "./components/Logo";
import { SendEmail } from "./server-actions";

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

const navBar = [
  {displayName: 'Home', id: 'home', icon: <PiHouseBold />},
  {displayName: 'About Me', id: 'about-me', icon: <PiUserBold />},
  {displayName: 'Projects', id: 'projects', icon: <PiFolderBold />},
  {displayName: 'Work Experience', id: 'work-experience', icon: <PiBriefcaseBold />},
  {displayName: 'Tools', id: 'tools', icon: <PiWrenchBold />},
]

const technologies = [
  { displayName: 'JavaScript', icon: <PiFileJsx />},
  { displayName: 'TypeScript', icon: <PiFileTsx />},
  { displayName: 'C# 10.0', icon: <TbBrandCSharp />},
  { displayName: 'Python', icon: <TbBrandPython />},
  { displayName: 'Azure', icon: <SiMicrosoftazure />},
  { displayName: 'AWS', icon: <SiAmazonaws />},
  { displayName: 'SQL', icon: <PiFileSql />},
  { displayName: 'GitHub', icon: <PiGithubLogo />},
  { displayName: 'GitHub Actions', icon: <SiGithubactions />},
  { displayName: 'Node.JS', icon: <SiNodedotjs />},
  { displayName: 'React', icon: <SiReact />},
  { displayName: 'Next.JS', icon: <SiNextdotjs />},
]

const workExamples = [
  { displayName: 'Crystal Clear Screens', displaySrc: 'CrystalClear.jpg', fullSrc: ''}
]

const tooltipMotionProps = {
  variants: {
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: "easeIn",
      }
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      }
    },
  },
}

type ShapeProps = {
  position?: string;
  className?: string;
  width?: object;
  zIndex?: number;
  size?: object | number | string;
  color?: string;
  // Add other props based on the library's documentation
};

export default function Page() {
  const [senderName, setSenderName] = useState<string>();
  const [senderEmail, setSenderEmail] = useState<string>();
  const [senderMessage, setSenderMessage] = useState<string>();
  const [currentWorkExample, setCurrentWorkExample] = useState<string>();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const age = new Date().getFullYear() - 2003 - (new Date() < new Date('03/03/' + new Date().getFullYear()) ? 1 : 0);

  // Dynamic imported components
  const Donut = dynamic<ShapeProps>(() => import('react-awesome-shapes').then(mod => mod.Donut), { ssr: false });
  const Circle = dynamic<ShapeProps>(() => import('react-awesome-shapes').then(mod => mod.Circle), { ssr: false });
  const CircleGrid = dynamic<ShapeProps>(() => import('react-awesome-shapes').then(mod => mod.CircleGrid), { ssr: false });

  const handleSendMessage = async () => {
    await SendEmail(senderName, senderEmail, senderMessage);

    setSenderName("");
    setSenderEmail("");
    setSenderMessage("");
  };

  const handleOpenWorkExample = (src) => {
    if(src) {
      setCurrentWorkExample(src);
      onOpen();
    }
  }

  return (
    <div className={`${syne.className} flex flex-col min-h-screen`}>
      <main className="w-full">
        <Donut
          position="absolute"
          className="top-[260px] left-[810px] opacity-70"
          width={['60px', '60px', '60px', '60px']}
          color="gray"
          size="750px"
          zIndex={11}
        />

        {/* NAVBAR */}
        <div className="absolute hidden md:flex flex w-full justify-center">
          <div className="mt-6 w-54 h-12 rounded-xl bg-zinc-800 shadow-xl">
            {navBar.map((x) => (
              <Tooltip 
                key={x.displayName} 
                content={x.displayName} 
                delay={0} 
                closeDelay={0} 
                motionProps={tooltipMotionProps}
              >
                <Button 
                  isIconOnly 
                  variant="light" 
                  size="lg"
                  onClick={() => scroller.scrollTo(x.id, {
                    delay: 100,
                    smooth: true,
                    duration: 500
                  })}>{x.icon}</Button>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* HOME */}
        <section className="home flex flex-wrap text-center justify-center xl:justify-between place-items-center w-full h-[100svh] py-12 md:py-32 xl:px-80 bg-zinc-900">
          <div className="relative">
            <CircleGrid 
              position="absolute"
              className="top-[-45px] left-[-45px]"
              color="maroon"
              size="175px"
              zIndex={1}
            />

            <Donut
              position="absolute"
              className="top-[145px] left-[90px] opacity-50"
              width={['40px', '40px', '60px', '60px']}
              color="gray"
              size="250px"
              zIndex={1}
            />

            <Card className="bg-white w-80 z-10 flex justify-center place-items-center px-4">
              <Logo className="h-64 w-64 hover:cursor-pointer" />

              <motion.p 
                className="text-2xl font-bold text-zinc-900"
                initial={{ y: -10, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                ALEX MILLS
              </motion.p>
              <motion.p 
                className="text-lg text-zinc-600 pt-8 pb-6"
                initial={{ y: -10, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                A Software Engineer who has developed countless innovative solutions.
              </motion.p>
            </Card>
          </div>
          <div>
            <motion.div
              className="text-center lg:text-left font-bold tracking-tighter pt-6 px-6 xl:px-0"
              initial={{ y: -10, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-4xl lg:text-6xl 2xl:text-8xl">SOFTWARE</p>
              <p className="text-4xl lg:text-6xl 2xl:text-8xl text-zinc-600">ENGINEER</p>
            </motion.div>
            <motion.p
              className="max-w-[700px] text-left text-zinc-500 xl:text-xl mt-4 mx-auto dark:text-gray-400 px-6 xl:px-0"
              initial={{ y: -10, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products.
            </motion.p>
          </div>
        </section>
        
        {/* ABOUT ME */}
        <section className="about-me flex justify-center w-full h-[100svh] bg-zinc-900 py-12 xl:py-24 lg:py-32">
          <div className="container flex flex-col px-4 xl:px-12 text-center place-items-center">
            <PiUserBold size={72} />
            <motion.p 
              className="text-3xl font-bold py-6 tracking-tighter sm:text-5xl"
              initial={{ y: -20, opacity: 0}}
              whileInView={{ y: 0, opacity: 1}}
              transition={{ duration: 0.3 }}
            >
              About Me
            </motion.p>

            <div className="flex justify-center place-items-center">
              <div className="w-full">
                <motion.div 
                  className="w-full flex justify-left text-2xl pt-4 text-center xl:text-left"
                  initial={{ y: -20, opacity: 0}}
                  whileInView={{ y: 0, opacity: 1}}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                </motion.div>

                <motion.div
                  initial={{ opacity: 0}}
                  whileInView={{ opacity: 1}}
                  transition={{ duration: 0.3, delay: 0.30 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex flex-row gap-2 w-full h-4">
                        <Circle 
                          size={['15px', '15px', '15px', '15px']}
                          position="relative"
                          color="#FF5F57"
                        />
                        <Circle 
                          size={['15px', '15px', '15px', '15px']}
                          position="relative"
                          color="#FEBD40"
                        />
                        <Circle 
                          size={['15px', '15px', '15px', '15px']}
                          position="relative"
                          color="#3FC948"
                        />
                      </div>
                    </CardHeader>

                    <CardBody className="p-4 w-full">
                      <div className="font-mono">
                        <p><span className="text-red-600">Alex@Portfolio</span>:<span className="text-blue-500">/</span>$ neofetch</p>

                        <div className="flex mt-6 gap-4">
                          <Logo motionEnabled={false} className="h-72 w-72" />

                          <div>
                            <p><span className="text-red-600">Host</span>: Alex Mills</p>
                            <p>--------------------------------------</p>
                            <p><span className="text-red-600">Model</span>: He/Him</p>
                            <p><span className="text-red-600">Uptime</span>: {age} years</p>
                            <p><span className="text-red-600">Packages</span>: {workExamples.length}</p>
                            <p className="text-pretty"><span className="text-red-600">Hobbies</span>: ["3D Printing", "Programming", "Video Games"]</p>
                            <p className="text-pretty"><span className="text-red-600">Languages</span>: ["C#", "JS", "TS", "Python"]</p>
                          </div>
                        </div>

                        <p><span className="text-red-600">Alex@Portfolio</span>:<span className="text-blue-500">/</span>$</p>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              </div>
            </div>

          </div>
        </section>
        
        {/* MY PROJECTS */}
        <section className="projects flex justify-center w-full h-[100svh] bg-zinc-900 py-12 xl:py-24 lg:py-32">
          <div className="container flex flex-col place-items-center px-4 xl:px-6 text-center">
            <PiBriefcaseBold size={72} />
            <motion.p 
              className="text-3xl font-bold py-6 tracking-tighter sm:text-5xl"
              initial={{ y: -20, opacity: 0}}
              whileInView={{ y: 0, opacity: 1}}
              transition={{ duration: 0.3 }}
            >
              My Projects
            </motion.p>
            <div className="grid gap-8 mt-8 grid-cols-2 sm:grid-cols-4 xl:grid-cols-4 lg:grid-cols-6">
              {workExamples.map((x) => (
                <div key={x.displayName}>
                  <p className="pb-8 ">{x.displayName}</p>
                  <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.05 } }} 
                    whileTap={{ scale: 1 }}
                    className="hover:cursor-pointer"
                  >
                    <img src={x.displaySrc} onClick={() => handleOpenWorkExample(x.displaySrc)}/>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MY WORK DISPLAY MODAL */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" backdrop="blur" radius="none">
          <ModalContent>
            {(onClose) => (
              <div>
                <img src={currentWorkExample} />
              </div>
            )}
          </ModalContent>
        </Modal>

        <section className="tools flex justify-center w-full bg-zinc-900 py-12 xl:py-24 lg:py-32">
          <div className="container px-4 xl:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Programming Languages, Frameworks & Tools
            </h2>
            <div className="grid gap-8 mt-8 grid-cols-2 sm:grid-cols-4 xl:grid-cols-4 lg:grid-cols-6">
              {technologies.map((x) => (
                <motion.div className="flex flex-col gap-2 justify-center place-items-center p-4 border-1 rounded-md"
                initial={{ borderColor: "#ffffff" }}
                whileHover={{ borderColor: "#D90429" }}
                key={x.displayName}
              >
                <div className="[&>*]:h-12 [&>*]:w-12">{x.icon}</div>
                <h3 className="text-xl font-bold">{x.displayName}</h3>
              </motion.div>
              ))}
            </div> 
          </div>
        </section>

        <section
          className="flex justify-center w-full py-12 xl:py-24 lg:py-32 bg-zinc-900"
          id="contact"
        >
          <div className="container px-4 xl:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
            <div className="mt-8 flex flex-col gap-6 max-w-md mx-auto">
              <Input
                value={senderName}
                onValueChange={setSenderName}
                variant="bordered"
                size="sm"
                className="h-auto"
                placeholder="Your Name"
                type="text"
              />
              <Input
                value={senderEmail}
                onValueChange={setSenderEmail}
                variant="bordered"
                size="sm"
                className="h-auto"
                placeholder="Your Email"
                type="email"
              />

              <Textarea
                className="h-24 rounded-md"
                placeholder="Your Message"
                variant="bordered"
                value={senderMessage}
                onValueChange={setSenderMessage}
              />

              <Button
                onPress={handleSendMessage}
                className="self-center"
                type="submit"
                color="primary"
                variant="shadow"
              >
                Submit
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
