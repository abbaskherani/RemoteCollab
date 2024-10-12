import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Aoun Abbas Kherani. All rights reserved.</p>
          </div>
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li><Link to='#' className="hover:underline">About</Link></li>
              <li><Link to="#" className="hover:underline">Services</Link></li>
              <li><Link to="#" className="hover:underline">Contact</Link></li>
              <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </nav>
          <div className="flex space-x-4">
            <a href="#" target="_self" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" target="_self" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" target="_self" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" target="_self" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}