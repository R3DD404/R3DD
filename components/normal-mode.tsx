import { useState, useEffect } from 'react'; // Add useEffect
import { Github, Twitter, Mail, ExternalLink, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import ExitButton from './exit-button'; // Import your ExitButton component

interface NormalModeProps {
  onExit: () => void;
}

const NormalMode = ({ onExit }: NormalModeProps) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [thmBadgeUrl, setThmBadgeUrl] = useState(''); // State for THM badge URL

  const toggleGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 200);
  };

  // Cache-busting for THM badge
  useEffect(() => {
    const timestamp = Date.now(); // Generate a unique timestamp
    const url = `https://tryhackme-badges.s3.amazonaws.com/R3DD.png?t=${timestamp}`; // Append timestamp as query parameter
    setThmBadgeUrl(url); // Set the URL with cache-busting
  }, []);

  const blogPosts = [
    {
      title: "Silver Platter- Walkthrough THM | R3DD",
      date: "2025-03-15",
      excerpt: "A detailed walkthrough of the Silver Platter room on TryHackMe, covering enumeration, exploitation, and privilege escalation techniques.",
      tags: ["TryHackMe", "Walkthrough"],
      link: "https://medium.com/@r3dd404/silver-platter-walkthrough-thm-r3dd-b419acc1ce9d"
    },
    {
      title: "TryHackMe- Lookup Walkthrough| R3DD",
      date: "2025-02-28",
      excerpt: "Step-by-step guide to solving the Lookup room on TryHackMe, perfect for beginners looking to improve their skills.",
      tags: ["TryHackMe", "Easy"],
      link: "https://medium.com/@r3dd404/tryhackme-lookup-walkthrough-8928d546fc53"
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Replace the existing Button with ExitButton */}
      <ExitButton onExit={onExit} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <Card className="bg-black/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle
              className={`text-4xl font-mono text-red-500 ${glitchActive ? 'animate-glitch' : ''}`}
              onMouseEnter={toggleGlitch}
            >
              R3DD
            </CardTitle>
            <CardDescription className="text-green-400 font-mono">
              CTF Player | Student
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-green-300 font-mono mt-4 space-y-10">
              <p>Hey there, I'm R3DD — 17 years old, into cybersecurity, and spending most of my time solving labs on TryHackMe. Been at it for almost a year now — climbing leaderboards, breaking into systems (legally), and always pushing to learn more.</p>
              <p>My journey has been focused on continuous learning and growth.</p>
              <p>Made it to the Top 3% on TryHackMe. It's been a solid journey so far, picking up practical cybersecurity skills. Also slipped into the Top 50 on the monthly leaderboard in India— just keeping the grind going, plenty more to figure out.</p>
              <p>Each day brings new challenges and opportunities to deepen my understanding of security concepts and techniques. I'm passionate about applying my skills to real-world scenarios and expanding my knowledge and network every step of the way.</p>
            </div>
          </CardContent>
        </Card>

        {/* TryHackMe Section */}
        <Card className="bg-black/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl font-mono text-green-500">TryHackMe</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <a href="https://tryhackme.com/p/R3DD" target="_blank" rel="noopener noreferrer">
              {/* Use the cache-busted URL for the THM badge */}
              {thmBadgeUrl && (
                <Image
                  src={thmBadgeUrl}
                  alt="TryHackMe Badge"
                  width={500}
                  height={80}
                  className="rounded-lg cursor-pointer"
                />
              )}
            </a>

            {/* Discord Widget */}
            <div className="w-full border-t border-green-500 pt-4">
              <CardTitle className="text-2xl font-mono text-green-500">Join My Discord</CardTitle>
              <iframe
                src="https://discord.com/widget?id=1310211863920771212&theme=dark"
                width="550"
                height="400"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="rounded-lg"
              ></iframe>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts - Full Width */}
        <Card className="bg-black/70 backdrop-blur-md md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-mono text-green-500">Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {blogPosts.map((post, index) => (
              <div key={index} className="space-y-2">
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <h3 className="text-xl font-mono text-green-400 hover:text-green-300 cursor-pointer flex items-center">
                    {post.title}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </h3>
                </a>
                <p className="text-sm text-green-500 font-mono">{post.date}</p>
                <p className="text-green-300 font-mono">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="border-green-500 text-green-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {index < blogPosts.length - 1 && (
                  <Separator className="bg-green-500/30 my-4" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Social Media Links - Placed at the bottom of the page */}
      <div className="max-w-7xl mx-auto mt-8">
        <Card className="bg-black/70 backdrop-blur-md">
          <CardFooter className="flex flex-wrap justify-center gap-4 p-6">
            <a href="https://x.com/R3DD404" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center space-x-2 border-green-500 text-green-500 hover:bg-green-900/20 w-32">
                <Twitter className="h-5 w-5" />
                <span>Twitter</span>
              </Button>
            </a>
            <a href="https://github.com/R3DD404" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center space-x-2 border-green-500 text-green-500 hover:bg-green-900/20 w-32">
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </Button>
            </a>
            <a href="https://www.instagram.com/in/R3DD404" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="flex items-center space-x-2 border-green-500 text-green-500 hover:bg-green-900/20 w-32">
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </Button>
            </a>
            <a href="mailto:r3dd.sec@gmail.com">
              <Button variant="outline" className="flex items-center space-x-2 border-green-500 text-green-500 hover:bg-green-900/20 w-32">
                <Mail className="h-5 w-5" />
                <span>Email</span>
              </Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NormalMode;