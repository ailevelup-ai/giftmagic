'use client'

import { useState, useRef, useEffect } from 'react'
import { GiftIcon, Flower2Icon, MessageSquareIcon, ChevronLeft, ChevronRight, HomeIcon, UsersIcon, Settings, MessageCircleIcon, PlusIcon, PencilIcon, ContactIcon, Sparkles, TrashIcon, BellIcon, LogOutIcon, CreditCardIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from 'next/image'
import Link from 'next/link'

/* eslint-disable @typescript-eslint/no-unused-vars */

type Friend = {
  id: number
  name: string
  daysUntilBirthday: number
  birthdate: Date
  interests: string
  avatar: string
}

type GiftSuggestion = {
  id: number
  src: string
  alt: string
  description: string
  price: string
}

type FlowerArrangement = {
  id: number
  src: string
  alt: string
  description: string
  price: string
}

type GiftCard = {
  id: number
  src: string
  alt: string
  description: string
  price: string
}

const friends: Friend[] = [
  { id: 1, name: "Bob Smith", daysUntilBirthday: 13, birthdate: new Date(2024, 8, 15), interests: "Hiking, Photography, Cooking", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Charlie Brown", daysUntilBirthday: 92, birthdate: new Date(2024, 11, 3), interests: "Comics, Baseball, Dogs", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Alice Johnson", daysUntilBirthday: 248, birthdate: new Date(2025, 4, 7), interests: "Painting, Yoga, Gardening", avatar: "https://i.pravatar.cc/150?img=3" },
]

const allGiftSuggestions: GiftSuggestion[] = [
  { id: 1, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/expensive%20necklace-amCTX8jvBC6YNpeQ9lHAoUAlHTXuPX.jpeg", alt: "Ornate diamond necklace", description: "Elegant diamond necklace", price: "$999.99" },
  { id: 2, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luxurious%20cashmere%20scarf,%20soft%20and%20clearly%20cashmere-R4Zhc8eI3j0S2XvCPvkeeUvU3Tt3Yv.jpeg", alt: "Soft pink cashmere scarf", description: "Luxurious cashmere scarf", price: "$199.99" },
  { id: 3, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/make%20the%20skincare%20set%20look%20extremely%20high%20end%20and%20luxurious%20with%20the%20products%20displayed%20beautifully%20and%20with%20careful%20precision-QtzsQoawYAsi29hHsP1EKvMLy1pv6V.jpeg", alt: "Luxurious skincare set", description: "High-end skincare set", price: "$299.99" },
  { id: 4, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jewelry%20Box%20%E2%80%93%20Polished%20wood%20or%20velvet%20exteriors%20filled%20with%20extremely%20expensive%20jewelry,%20displayed%20beautifully%20and%20with%20careful%20precision,%20showing%20more%20of%20the%20box%20in%20the%20image-vNoSRkbQPJgdBQ1MSrmM1DdaPNGACu.jpeg", alt: "Polished wood jewelry box", description: "Elegant jewelry box", price: "$399.99" },
  { id: 5, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/womens%20watch%20rose%20gold%20incredibly%20exuqisitive%20and%20refined%20jewelry%20design%20bedazzling%20with%20high%20carat%20diamonds-XAUZTiQAfAjoxoiWqib2VpMDdI5dUj.jpeg", alt: "Rose gold diamond-encrusted watch", description: "Luxury diamond watch", price: "$1999.99" },
  { id: 6, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quirky%20flamboyant%20designer%20handbag-SHw4OK4kIJaRt9oQE7OWWUIa2OarD8.jpeg", alt: "Vibrant designer handbag with intricate beadwork", description: "Designer handbag", price: "$799.99" },
  { id: 7, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luxury%20scented%20candles%20grok2-8NnqNoglyq5VXdeSgYZRlRgApQVTnC.jpeg", alt: "Luxury scented candle", description: "Premium scented candle", price: "$59.99" },
  { id: 8, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silk%20robe-C3Z6rYmLKc3sFKBt0IMhyoA3K55MxD.jpeg", alt: "Pink silk robe", description: "Elegant silk robe", price: "$129.99" },
  { id: 9, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wine%20case-Brd7RUIxLbYDrnoYYNWmGhhiRC1XER.jpeg", alt: "Leather wine case", description: "Premium wine collection", price: "$249.99" },
  { id: 10, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gift%20basket-Rx6iKmZSqBJMRjABwZlvZ18Vn3rHuq.jpeg", alt: "Gourmet gift basket", description: "Luxury picnic basket", price: "$179.99" },
  { id: 11, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diamond%20earrings-0KpuS8Z2eIHPhBbvNJTfBiUDDFQza1.jpeg", alt: "Diamond earrings", description: "Exquisite diamond earrings", price: "$1499.99" },
  { id: 12, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adorable%20teddy%20bear-PvTufdcu9fjk5E6sa2jMYWm3UjGgey.jpeg", alt: "Adorable teddy bear with heart", description: "Cuddly teddy bear", price: "$39.99" },
]

const flowerArrangements: FlowerArrangement[] = [
  { id: 1, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flowers6-XxZzgjOr2PGwi8ssYcxQNWNogFSTwP.jpeg", alt: "Red roses in silver vase with box", description: "Classic Red Roses", price: "$79.99" },
  { id: 2, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/roses1-I14o2tbFiYIA7AWafGVvrgH7gV9OUg.jpeg", alt: "Large bouquet of red and pink roses", description: "Romantic Rose Medley", price: "$89.99" },
  { id: 3, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flowers3-vPn9hJ5p1qbtabMMNoHsxjzOoCk4on.jpeg", alt: "Colorful flowers in wooden cart", description: "Rustic Garden Charm", price: "$69.99" },
  { id: 4, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flowers5-ZtP6SNfUXQvZ1hvVATyKOaRj7kTwcq.jpeg", alt: "Vibrant mixed bouquet with lilies and roses", description: "Vibrant Bloom Bonanza", price: "$99.99" },
  { id: 5, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flowers2-OoF3Psl84XN5y2XL2iuOmNzoizvqYe.jpeg", alt: "White and green flowers with handbag", description: "Elegant White & Green", price: "$84.99" },
  { id: 6, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flowers7-dWVe1cJIKfPDL2TClASEIar97Wiigp.jpeg", alt: "Luxurious purple and white roses with golden elements", description: "Royal Purple & Gold", price: "$109.99" },
]

const giftCards: GiftCard[] = [
  { id: 1, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/starbucks%20gift%20card-iuQIiimm78XZVEFzKl9n0ZwfAYuASz.jpeg", alt: "Starbucks Gift Card", description: "Starbucks Gift Card", price: "$25" },
  { id: 2, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/roblox%20gift%20card-881lUrpquBgfKEBayXuqyX4N9XLsYd.jpeg", alt: "Roblox Gift Card", description: "Roblox Gift Card", price: "$25" },
  { id: 3, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/total%20wine%20gift%20card-BdpchSLND5V5Lqyq4FWqQQfPleUEAF.jpeg", alt: "Total Wine Gift Card", description: "Total Wine Gift Card", price: "$50" },
  { id: 4, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/treat%20yourself%20gift%20card-ulrolGMsRSS8yknIHWF0s1h0TXaBgl.png", alt: "Treat Yourself Gift Card", description: "Treat Yourself Multi-Store Gift Card", price: "$50" },
  { id: 5, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lets%20eat%20gift%20card-nGUDomsmRWiHXPkb0C50Yep9bjajAG.jpg", alt: "Let's Eat Gift Card", description: "Let's Eat Multi-Restaurant Gift Card", price: "$50" },
  { id: 6, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tractorsupply%20gfit%20card-3ZcgIFPZ1TZGTjP9itFE1PGhA773gs.jpeg", alt: "Tractor Supply Company Gift Card", description: "Tractor Supply Company Gift Card", price: "$50" },
  { id: 7, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visa%20gift%20card-RulzOPYv5DDFMXPdvpNB9VDYeRkJHZ.jpg", alt: "Visa Gift Card", description: "Visa Gift Card", price: "$200" },
  { id: 8, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top%20golf%20gift%20card-hw3Ba0vI2NWPoczZt9D679PwxOOTNa.jpeg", alt: "Topgolf Gift Card", description: "Topgolf Gift Card", price: "$50" },
  { id: 9, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tango%20card-tBPyywhjOBlOGCE5fKR59IiJCTyHb4.png", alt: "Multi-Brand Gift Card", description: "Multi-Brand Gift Card", price: "Various" },
  { id: 10, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/best%20buy%20gift%20card-08ADpz3JMxexdSOxJuCMvaozgYWkBm.jpg", alt: "Best Buy Gift Card", description: "Best Buy Gift Card", price: "$50" },
  { id: 11, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/victorias%20secret-BwPeKVEry4zpLORIrxLeMxKwxWO6XN.jpeg", alt: "Victoria's Secret Gift Card", description: "Victoria's Secret Gift Card", price: "$50" },
  { id: 12, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/starbucks2-ePAl34wJ2H0NaUdueQ4qFU6E0Mw0nj.webp", alt: "Starbucks Gift Card", description: "Starbucks 'When in Doubt, Coffee' Gift Card", price: "$25" }
]

const sampleAd = {
  image: "/placeholder.svg",
  title: "Special Gift Box",
  description: "Perfect for any occasion!",
  link: "https://example.com/gift-box"
}

const occasions = [
  "Birthday",
  "Anniversary",
  "Holiday",
  "Get Well Soon",
  "Special Event",
  "General"
]

export function Page() {
  const [activeTab, setActiveTab] = useState('home')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0)
  const [friendsList, setFriendsList] = useState(friends)
  const carouselRef = useRef<HTMLDivElement>(null)

  const [isAddFriendDialogOpen, setIsAddFriendDialogOpen] = useState(false)
  const [newFriendName, setNewFriendName] = useState('')
  const [newFriendBirthdate, setNewFriendBirthdate] = useState('')
  const [newFriendInterests, setNewFriendInterests] = useState('')

  const [isEditInterestsDialogOpen, setIsEditInterestsDialogOpen] = useState(false)
  const [editingFriendId, setEditingFriendId] = useState<number | null>(null)
  const [editingInterests, setEditingInterests] = useState('')

  const [isConnectContactsDialogOpen, setIsConnectContactsDialogOpen] = useState(false)
  const [isConnectingContacts, setIsConnectingContacts] = useState(false)

  const [isConnectSocialMediaDialogOpen, setIsConnectSocialMediaDialogOpen] = useState(false)
  const [isConnectingSocialMedia, setIsConnectingSocialMedia] = useState(false)

  const [selectedFriend, setSelectedFriend] = useState<string>('')
  const [selectedOccasion, setSelectedOccasion] = useState<string>('')
  const [giftMessage, setGiftMessage] = useState('')
  const [flowerMessage, setFlowerMessage] = useState('')
  const [message, setMessage] = useState('')
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false)
  const [pastMessages, setPastMessages] = useState<string[]>([])

  const [userName, setUserName] = useState('John Doe')
  const [userEmail, setUserEmail] = useState('john.doe@example.com')
  const [userPhone, setUserPhone] = useState('+1 (555) 123-4567')
  const [userAddress, setUserAddress] = useState('123 Main St, Anytown, USA 12345')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [textNotifications, setTextNotifications] = useState(false)

  const [currentGiftSet, setCurrentGiftSet] = useState<GiftSuggestion[]>(allGiftSuggestions.slice(0, 6))
  const [currentSetIndex, setCurrentSetIndex] = useState(0)

  const [currentGiftCardSet, setCurrentGiftCardSet] = useState<GiftCard[]>(giftCards.slice(0, 6))
  const [currentGiftCardSetIndex, setCurrentGiftCardSetIndex] = useState(0)

  const [sendEmail, setSendEmail] = useState(false)
  const [sendText, setSendText] = useState(false)
  const [sendECard, setSendECard] = useState(false)
  const [sendPostalCard, setSendPostalCard] = useState(false)

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const monthName = currentMonth.toLocaleString('default', { month: 'long' })
  const year = currentMonth.getFullYear()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleSliderChange = (value: number[]) => {
    setCurrentGiftIndex(value[0])
  }

  const prevGift = () => {
    setCurrentGiftIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const nextGift = () => {
    setCurrentGiftIndex((prev) => (prev < allGiftSuggestions.length - 1 ? prev + 1 : prev))
  }

  const isBirthday = (day: number) => {
    return friendsList.some(friend => 
      friend.birthdate.getDate() === day &&
      friend.birthdate.getMonth() === currentMonth.getMonth() &&
      friend.birthdate.getFullYear() === currentMonth.getFullYear()
    )
  }

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() &&
           currentMonth.getMonth() === today.getMonth() &&
           currentMonth.getFullYear() === today.getFullYear()
  }

  const handleAddFriend = () => {
    setIsAddFriendDialogOpen(true)
  }

  const handleAddFriendSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newFriend: Friend = {
      id: friendsList.length + 1,
      name: newFriendName,
      birthdate: new Date(newFriendBirthdate),
      daysUntilBirthday: 0, // This should be calculated
      interests: newFriendInterests,
      avatar: `https://i.pravatar.cc/150?img=${friendsList.length + 1}`
    }
    setFriendsList([...friendsList, newFriend])
    setIsAddFriendDialogOpen(false)
    setNewFriendName('')
    setNewFriendBirthdate('')
    setNewFriendInterests('')
  }

  const handleEditInterests = (friendId: number) => {
    const friend = friendsList.find(f => f.id === friendId)
    if (friend) {
      setEditingFriendId(friendId)
      setEditingInterests(friend.interests)
      setIsEditInterestsDialogOpen(true)
    }
  }

  const handleEditInterestsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFriendsList(friendsList.map(friend => 
      friend.id === editingFriendId ? { ...friend, interests: editingInterests } : friend
    ))
    setIsEditInterestsDialogOpen(false)
    setEditingFriendId(null)
    setEditingInterests('')
  }

  const handleConnectContacts = () => {
    setIsConnectContactsDialogOpen(true)
  }

  const handleConnectContactsConfirm = () => {
    setIsConnectingContacts(true)
    setTimeout(() => {
      setIsConnectingContacts(false)
      setIsConnectContactsDialogOpen(false)
      console.log("Contacts connected. Friends list would be updated here.")
    }, 2000)
  }

  const handleConnectSocialMedia = (platform: string) => {
    setIsConnectingSocialMedia(true)
    console.log(`Connecting to ${platform}...`)
    // Simulate API call
    setTimeout(() => {
      setIsConnectingSocialMedia(false)
      console.log(`Connected to ${platform}. Friends list would be updated here.`)
    }, 2000)
  }

  const handleSendGift = () => {
    console.log(`Sending gift to ${selectedFriend} for ${selectedOccasion} with message: ${giftMessage}`)
    // Reset form
    setSelectedFriend('')
    setSelectedOccasion('')
    setGiftMessage('')
  }

  const handleSendGiftCard = () => {
    console.log(`Sending gift card to ${selectedFriend} for ${selectedOccasion} with message: ${giftMessage}`)
    // Reset form
    setSelectedFriend('')
    setSelectedOccasion('')
    setGiftMessage('')
  }

  const handleSendFlowers = () => {
    console.log(`Sending flowers to ${selectedFriend} with message: ${flowerMessage}`)
    // Reset form
    setSelectedFriend('')
    setFlowerMessage('')
  }

  const handleSendMessage = () => {
    console.log(`Sending message to ${selectedFriend}: ${message}`)
    console.log(`Send options: Email: ${sendEmail}, Text: ${sendText}, E-Card: ${sendECard}, Postal Card: ${sendPostalCard}`)
    setPastMessages(prevMessages => [...prevMessages, message])
    setMessage('')
    setSendEmail(false)
    setSendText(false)
    setSendECard(false)
    setSendPostalCard(false)
  }

  const generateAIMessage = async () => {
    setIsGeneratingMessage(true)
    const selectedFriendData = friendsList.find(friend => friend.id.toString() === selectedFriend)
    
    if (selectedFriendData) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const today = new Date()
      const birthDate = new Date(selectedFriendData.birthdate)
      const age = today.getFullYear() - birthDate.getFullYear()
      
      const generatedMessage = `Happy ${age}th birthday, ${selectedFriendData.name}! 🎉 Hope your day is filled with ${selectedFriendData.interests.split(', ')[0]} and all the things you love. Here's to another year of amazing adventures!`
      
      setMessage(generatedMessage)
    }
    
    setIsGeneratingMessage(false)
  }

  const handleSaveSettings = () => {
    console.log('Saving settings:', {
      userName,
      userEmail,
      userPhone,
      userAddress,
      notifications: {
        email: emailNotifications,
        push: pushNotifications,
        text: textNotifications
      },
    })
    // In a real application, you would send this data to a backend service
  }

  const handleDeleteFriend = (friendId: number) => {
    setFriendsList(friendsList.filter(friend => friend.id !== friendId))
  }

  const handleSuggestMore = () => {
    const nextSetIndex = (currentSetIndex + 1) % 2
    setCurrentSetIndex(nextSetIndex)
    setCurrentGiftSet(allGiftSuggestions.slice(nextSetIndex * 6, (nextSetIndex + 1) * 6))
  }

  const handleSuggestMoreGiftCards = () => {
    const nextSetIndex = (currentGiftCardSetIndex + 1) % 2
    setCurrentGiftCardSetIndex(nextSetIndex)
    setCurrentGiftCardSet(giftCards.slice(nextSetIndex * 6, (nextSetIndex + 1) * 6))
  }

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentGiftIndex * (100 / allGiftSuggestions.length)}%)`
    }
  }, [currentGiftIndex])

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <header className="flex justify-between items-center mb-8">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grok%202%20third%20try-cVmXK0TV6wOFddOjoSs68JJlsrwAjI.jpeg"
              alt="GiftMagic Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
            <h1 className="text-3xl font-bold text-purple-700">Gift Magic</h1>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <BellIcon className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LogOutIcon className="h-5 w-5" />
                  <span className="sr-only">Log out</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-8">
          <TabsTrigger value="home" className="flex flex-col items-center py-2">
            <HomeIcon className="h-5 w-5 mb-1" />
            <span>Home</span>
          </TabsTrigger>
          <TabsTrigger value="gift" className="flex flex-col items-center py-2">
            <GiftIcon className="h-5 w-5 mb-1" />
            <span>Gift</span>
          </TabsTrigger>
          <TabsTrigger value="giftcards" className="flex flex-col items-center py-2">
            <CreditCardIcon className="h-5 w-5 mb-1" />
            <span>Gift Cards</span>
          </TabsTrigger>
          <TabsTrigger value="flowers" className="flex flex-col items-center py-2">
            <Flower2Icon className="h-5 w-5 mb-1" />
            <span>Flowers</span>
          </TabsTrigger>
          <TabsTrigger value="message" className="flex flex-col items-center py-2">
            <MessageCircleIcon className="h-5 w-5 mb-1" />
            <span>Message</span>
          </TabsTrigger>
          <TabsTrigger value="friends" className="flex flex-col items-center py-2">
            <UsersIcon className="h-5 w-5 mb-1" />
            <span>Friends</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex flex-col items-center py-2">
            <Settings className="h-5 w-5 mb-1" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white rounded-lg shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-purple-700 mb-4">Upcoming Birthdays</h2>
                <ul className="space-y-2">
                  {friendsList.map(friend => (
                    <li key={friend.id} className="flex justify-between items-center bg-pink-100 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-800">{friend.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          {friend.daysUntilBirthday} days
                        </Badge>
                        <div className="flex space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-pink-500">
                                  <GiftIcon className="h-4 w-4" />
                                  <span className="sr-only">Send gift</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Send gift</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-pink-500">
                                  <Flower2Icon className="h-4 w-4" />
                                  <span className="sr-only">Send flowers</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Send flowers</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-pink-500">
                                  <MessageSquareIcon className="h-4 w-4" />
                                  <span className="sr-only">Send message</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Send message</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-purple-700 mb-4">Birthday Calendar</h2>
                <div className="bg-pink-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <Button onClick={prevMonth} variant="ghost" size="icon" className="text-purple-700">
                      <ChevronLeft className="h-6 w-6" />
                      <span className="sr-only">Previous month</span>
                    </Button>
                    <h3 className="text-lg font-semibold text-purple-700">{`${monthName} ${year}`}</h3>
                    <Button onClick={nextMonth} variant="ghost" size="icon" className="text-purple-700">
                      <ChevronRight className="h-6 w-6" />
                      <span className="sr-only">Next month</span>
                    </Button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="font-semibold text-purple-700">{day}</div>
                    ))}
                    {Array(firstDayOfMonth).fill(null).map((_, index) => (
                      <div key={`empty-${index}`} />
                    ))}
                    {days.map(day => (
                      <div
                        key={day}
                        className={`aspect-square flex items-center justify-center text-sm ${
                          isBirthday(day) ? 'bg-pink-300 rounded-full font-bold' : ''
                        } ${
                          isToday(day) ? 'bg-purple-500 text-white rounded-full font-bold' : ''
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white rounded-lg shadow-lg mt-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">Gift Suggestions</h2>
              <div className="relative overflow-hidden" style={{ height: '300px' }}>
                <Button
                  onClick={prevGift}
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 hover:bg-opacity-75"
                  disabled={currentGiftIndex === 0}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous gift</span>
                </Button>
                <div 
                  ref={carouselRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ width: `${allGiftSuggestions.length * 100}%` }}
                >
                  {allGiftSuggestions.map((gift) => (
                    <div 
                      key={gift.id} 
                      className="w-full flex-shrink-0 cursor-pointer" 
                      style={{ width: `${100 / allGiftSuggestions.length}%` }}
                    >
                      <Image
                        src={gift.src}
                        alt={gift.alt}
                        width={300}
                        height={300}
                        className="object-cover rounded-lg mx-auto"
                      />
                      <div className="text-center mt-2">
                        <p className="font-semibold">{gift.description}</p>
                        <p className="text-purple-600">{gift.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={nextGift}
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 hover:bg-opacity-75"
                  disabled={currentGiftIndex === allGiftSuggestions.length - 1}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next gift</span>
                </Button>
              </div>
              <div className="mt-4">
                <Slider
                  value={[currentGiftIndex]}
                  max={allGiftSuggestions.length - 1}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg mt-8">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-grow">
                <Image
                  src={sampleAd.image}
                  alt={sampleAd.title}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{sampleAd.title}</h3>
                  <p className="text-gray-600">{sampleAd.description}</p>
                </div>
              </div>
              <Button asChild>
                <Link href={sampleAd.link}>Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gift">
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">Send a Gift</h2>
              <div className="space-y-4">
                <Select value={selectedFriend} onValueChange={setSelectedFriend}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a friend" />
                  </SelectTrigger>
                  <SelectContent>
                    {friendsList.map((friend) => (
                      <SelectItem key={friend.id} value={friend.id.toString()}>{friend.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {occasions.map((occasion) => (
                      <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentGiftSet.map((gift) => (
                    <div key={gift.id} className="border rounded-lg p-2 cursor-pointer hover:border-purple-500 transition-all duration-300">
                      <Image src={gift.src} alt={gift.alt} width={150} height={150} className="object-cover rounded-lg mx-auto mb-2" />
                      <p className="text-center text-sm font-semibold">{gift.description}</p>
                      <p className="text-center text-sm text-purple-600">{gift.price}</p>
                    </div>
                  ))}
                </div>

                <Button onClick={handleSuggestMore} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  {currentSetIndex === 0 ? "Suggest More" : "Show Previous"}
                </Button>

                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Add a personal message"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full h-24"
                  />
                  <Button 
                    onClick={generateAIMessage}
                    disabled={!selectedFriend || isGeneratingMessage}
                    className="flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isGeneratingMessage ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    AI Suggest
                  </Button>
                </div>

                <Button onClick={handleSendGift} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                  Send Gift
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="giftcards">
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">Send a Gift Card</h2>
              <div className="space-y-4">
                <Select value={selectedFriend} onValueChange={setSelectedFriend}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a friend" />
                  </SelectTrigger>
                  <SelectContent>
                    {friendsList.map((friend) => (
                      <SelectItem key={friend.id} value={friend.id.toString()}>{friend.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {occasions.map((occasion) => (
                      <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentGiftCardSet.map((giftCard) => (
                    <div key={giftCard.id} className="border rounded-lg p-2 cursor-pointer hover:border-purple-500 transition-all duration-300">
                      <Image src={giftCard.src} alt={giftCard.alt} width={150} height={150} className="object-cover rounded-lg mx-auto mb-2" />
                      <p className="text-center text-sm font-semibold">{giftCard.description}</p>
                      <p className="text-center text-sm text-purple-600">{giftCard.price}</p>
                    </div>
                  ))}
                </div>

                <Button onClick={handleSuggestMoreGiftCards} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  {currentGiftCardSetIndex === 0 ? "Suggest More" : "Show Previous"}
                </Button>

                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Add a personal message"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full h-24"
                  />
                  <Button 
                    onClick={generateAIMessage}
                    disabled={!selectedFriend || isGeneratingMessage}
                    className="flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isGeneratingMessage ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    AI Suggest
                  </Button>
                </div>

                <Button onClick={handleSendGiftCard} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                  Send Gift Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flowers">
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">Send Flowers</h2>
              <div className="space-y-4">
                <Select value={selectedFriend} onValueChange={setSelectedFriend}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a friend" />
                  </SelectTrigger>
                  <SelectContent>
                    {friendsList.map((friend) => (
                      <SelectItem key={friend.id} value={friend.id.toString()}>{friend.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {flowerArrangements.map((arrangement) => (
                    <div key={arrangement.id} className="border rounded-lg p-2 cursor-pointer hover:border-purple-500 transition-all duration-300">
                      <Image src={arrangement.src} alt={arrangement.alt} width={150} height={150} className="object-cover rounded-lg mx-auto mb-2" />
                      <p className="text-center text-sm font-semibold">{arrangement.description}</p>
                      <p className="text-center text-sm text-purple-600">{arrangement.price}</p>
                    </div>
                  ))}
                </div>

                <Textarea
                  placeholder="Add a personal message"
                  value={flowerMessage}
                  onChange={(e) => setFlowerMessage(e.target.value)}
                  className="w-full"
                />
                <Button onClick={handleSendFlowers} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                  Send Flowers
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="message">
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">Send a Message</h2>
              <div className="space-y-4">
                <Select value={selectedFriend} onValueChange={setSelectedFriend}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a friend" />
                  </SelectTrigger>
                  <SelectContent>
                    {friendsList.map((friend) => (
                      <SelectItem key={friend.id} value={friend.id.toString()}>{friend.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full"
                  />
                  <Button 
                    onClick={generateAIMessage}
                    disabled={!selectedFriend || isGeneratingMessage}
                    className="flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isGeneratingMessage ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    AI Suggest
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Send options:</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="send-email" checked={sendEmail} onCheckedChange={(checked) => setSendEmail(checked as boolean)} />
                      <Label htmlFor="send-email">Send E-mail</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="send-text" checked={sendText} onCheckedChange={(checked) => setSendText(checked as boolean)} />
                      <Label htmlFor="send-text">Text</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="send-ecard" checked={sendECard} onCheckedChange={(checked) => setSendECard(checked as boolean)} />
                      <Label htmlFor="send-ecard">E-Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="send-postal" checked={sendPostalCard} onCheckedChange={(checked) => setSendPostalCard(checked as boolean)} />
                      <Label htmlFor="send-postal">Postal Card</Label>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSendMessage} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends">
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-purple-700 mb-6">Connect with Social Media</h2>
              <p className="mb-4 text-gray-600">Import your connections to find more friends birthdays.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Button onClick={handleConnectContacts} className="bg-gray-500 hover:bg-gray-600 text-white">
                  <ContactIcon className="h-4 w-4 mr-2" />
                  Connect Contacts
                </Button>
                <Button onClick={() => handleConnectSocialMedia('Twitter')} className="bg-blue-400 hover:bg-blue-500 text-white">
                  <TwitterIcon className="h-4 w-4 mr-2" />
                  Connect Twitter
                </Button>
                <Button onClick={() => handleConnectSocialMedia('Facebook')} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <FacebookIcon className="h-4 w-4 mr-2" />
                  Connect Facebook
                </Button>
                <Button onClick={() => handleConnectSocialMedia('Instagram')} className="bg-pink-600 hover:bg-pink-700 text-white">
                  <InstagramIcon className="h-4 w-4 mr-2" />
                  Connect Instagram
                </Button>
                <Button onClick={() => handleConnectSocialMedia('LinkedIn')} className="bg-blue-700 hover:bg-blue-800 text-white">
                  <LinkedinIcon className="h-4 w-4 mr-2" />
                  Connect LinkedIn
                </Button>
                <Button onClick={() => handleConnectSocialMedia('WhatsApp')} className="bg-green-500 hover:bg-green-600 text-white">
                  <MessageSquareIcon className="h-4 w-4 mr-2" />
                  Connect WhatsApp
                </Button>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-purple-700">Friends List</h2>
                <Button onClick={handleAddFriend} className="bg-green-500 hover:bg-green-600 text-white">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Friend
                </Button>
              </div>
              <ul className="space-y-4">
                {friendsList.map(friend => (
                  <li key={friend.id} className="bg-pink-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{friend.name}</h3>
                          <p className="text-sm text-gray-600">Birthday: {friend.birthdate.toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">Interests: {friend.interests}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => handleEditInterests(friend.id)} className="h-8 w-8 text-purple-600">
                                <PencilIcon className="h-4 w-4" />
                                <span className="sr-only">Edit interests</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit interests</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteFriend(friend.id)} className="h-8 w-8 text-red-500">
                                <TrashIcon className="h-4 w-4" />
                                <span className="sr-only">Delete friend</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete friend</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Notifications</Label>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="flex items-center space-x-2 cursor-pointer">
                      <span>Email</span>
                    </Label>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications" className="flex items-center space-x-2 cursor-pointer">
                      <span>Push</span>
                    </Label>
                    <Switch
                      id="push-notifications"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="text-notifications" className="flex items-center space-x-2 cursor-pointer">
                      <span>Text</span>
                    </Label>
                    <Switch
                      id="text-notifications"
                      checked={textNotifications}
                      onCheckedChange={setTextNotifications}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveSettings} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="mt-12 text-center text-gray-600">
        <p>&copy; 2024 aiLevelUp Inc. All rights reserved.</p>
      </footer>

      <Dialog open={isAddFriendDialogOpen} onOpenChange={setIsAddFriendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Friend</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddFriendSubmit} className="space-y-4">
            <Input
              placeholder="Friend's Name"
              value={newFriendName}
              onChange={(e) => setNewFriendName(e.target.value)}
              required
            />
            <Input
              type="date"
              placeholder="Birthdate"
              value={newFriendBirthdate}
              onChange={(e) => setNewFriendBirthdate(e.target.value)}
              required
            />
            <Input
              placeholder="Interests (comma separated)"
              value={newFriendInterests}
              onChange={(e) => setNewFriendInterests(e.target.value)}
            />
            <Button type="submit" className="w-full">Add Friend</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditInterestsDialogOpen} onOpenChange={setIsEditInterestsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Interests</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditInterestsSubmit} className="space-y-4">
            <Input
              placeholder="Interests (comma separated)"
              value={editingInterests}
              onChange={(e) => setEditingInterests(e.target.value)}
            />
            <Button type="submit" className="w-full">Save Interests</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isConnectContactsDialogOpen} onOpenChange={setIsConnectContactsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Contacts</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Allow GiftMagic to access your contacts to add them as friends?
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setIsConnectContactsDialogOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleConnectContactsConfirm} disabled={isConnectingContacts}>
              {isConnectingContacts ? 'Connecting...' : 'Connect'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isConnectSocialMediaDialogOpen} onOpenChange={setIsConnectSocialMediaDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Social Media</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Connect your social media accounts to import friends and stay updated on their special occasions.
          </DialogDescription>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => handleConnectSocialMedia('Facebook')} disabled={isConnectingSocialMedia} className="bg-blue-600 hover:bg-blue-700 text-white">
              <FacebookIcon className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            <Button onClick={() => handleConnectSocialMedia('Twitter')} disabled={isConnectingSocialMedia} className="bg-sky-500 hover:bg-sky-600 text-white">
              <TwitterIcon className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button onClick={() => handleConnectSocialMedia('Instagram')} disabled={isConnectingSocialMedia} className="bg-pink-600 hover:bg-pink-700 text-white">
              <InstagramIcon className="h-4 w-4 mr-2" />
              Instagram
            </Button>
            <Button onClick={() => handleConnectSocialMedia('LinkedIn')} disabled={isConnectingSocialMedia} className="bg-blue-800 hover:bg-blue-900 text-white">
              <LinkedinIcon className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsConnectSocialMediaDialogOpen(false)} variant="outline">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}