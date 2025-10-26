"use client"

import { useState } from "react"
import { Calendar, Clock, Play, Users, TrendingUp, Tv, ShoppingBag, MapPin, Heart, Headphones, Ticket } from "lucide-react"

interface SportsMatchDisplayProps {
  matchIndex?: number
}

export default function SportsMatchDisplay({ matchIndex = 0 }: SportsMatchDisplayProps) {
  const [activeTab, setActiveTab] = useState("events")

  // Mock data for different matches
  const matches = [
    {
      date: "Wednesday, July 9, 2025",
      time: "94'",
      sport: "FOOTBALL",
      homeTeam: { name: "San Jose", code: "SJ", score: 1, logo: "🔵" },
      awayTeam: { name: "Austin FC", code: "ATX", score: 1, logo: "🟢" },
      events: [
        { time: "23'", player: "C. Espinoza", type: "goal", team: "SJ" },
        { time: "67'", player: "S. Driussi", type: "goal", team: "ATX" },
        { time: "78'", player: "J. Ebobisse", type: "yellow", team: "SJ" },
        { time: "85'", player: "D. Pereira", type: "substitution", team: "ATX" },
      ],
      odds: {
        home: "2.10",
        draw: "3.40",
        away: "3.20",
      },
      stats: {
        possession: { home: 52, away: 48 },
        shots: { home: 8, away: 6 },
        corners: { home: 4, away: 3 },
      },
    },
    {
      date: "Wednesday, July 9, 2025",
      time: "76'",
      sport: "FOOTBALL",
      homeTeam: { name: "LA Galaxy", code: "LA", score: 2, logo: "🔵" },
      awayTeam: { name: "Seattle", code: "SEA", score: 0, logo: "🟢" },
      events: [
        { time: "15'", player: "R. Puig", type: "goal", team: "LA" },
        { time: "43'", player: "D. Fagundez", type: "goal", team: "LA" },
        { time: "58'", player: "C. Roldan", type: "yellow", team: "SEA" },
        { time: "71'", player: "J. Morris", type: "substitution", team: "SEA" },
      ],
      odds: {
        home: "1.85",
        draw: "3.60",
        away: "4.20",
      },
      stats: {
        possession: { home: 58, away: 42 },
        shots: { home: 12, away: 4 },
        corners: { home: 6, away: 2 },
      },
    },
  ]

  const match = matches[matchIndex] || matches[0]

  const tvChannels = [
    { name: "Apple TV", region: "United States", logo: "📺" },
    { name: "ESPN+", region: "United States", logo: "📺" },
    { name: "Fox Sports 1", region: "United States", logo: "📺" },
    { name: "Root Sports", region: "United States", logo: "📺" },
    { name: "Spectrum Sports", region: "United States", logo: "📺" },
    { name: "TUDN", region: "United States", logo: "📺" },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{match.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-red-300">LIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-lg font-bold">{match.time}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="bg-orange-500 hover:bg-orange-600 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors">
              BETTING <span className="hidden sm:inline text-xs">50% Bonus</span>
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors">
              GEAR <span className="hidden sm:inline text-xs">30% Off</span>
            </button>
            <button className="bg-green-500 hover:bg-green-600 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors">
              TRAVEL <span className="hidden sm:inline text-xs">Book Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[200px]">
        {/* Left Team Section */}
        <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 to-purple-700 text-white flex flex-col items-center justify-center relative p-4 lg:p-0 min-h-[120px] lg:min-h-[200px]">
          <div className="absolute top-2 left-2 lg:top-4 lg:left-4">
            <div className="w-8 h-8 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg lg:text-2xl">⚽</span>
            </div>
          </div>
          
          <div className="text-center w-full">
            <div className="text-xs font-medium mb-2">{match.sport}</div>
            <div className="flex flex-row lg:flex-col items-center justify-center gap-3 lg:gap-4">
              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500 rounded-lg flex items-center justify-center text-xl lg:text-2xl mb-1">
                  {match.homeTeam.logo}
                </div>
                <div className="text-xs font-medium">{match.homeTeam.code}</div>
              </div>
              <div className="text-white/60 text-sm font-bold">VS</div>
              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500 rounded-lg flex items-center justify-center text-xl lg:text-2xl mb-1">
                  {match.awayTeam.logo}
                </div>
                <div className="text-xs font-medium">{match.awayTeam.code}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Match Info */}
        <div className="lg:col-span-7 bg-gray-50 p-4">
          <div className="text-center mb-4">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">LIVE MATCH CENTER</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="w-5 h-5 lg:w-6 lg:h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    {match.homeTeam.code}
                  </span>
                  <span className="text-base lg:text-lg font-semibold">{match.homeTeam.name}</span>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-blue-600">{match.homeTeam.score}</div>
              </div>

              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-gray-400 mb-2">VS</div>
                <div className="w-3 h-3 bg-red-500 rounded-full mx-auto animate-pulse"></div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">
                    {match.awayTeam.code}
                  </span>
                  <span className="text-base lg:text-lg font-semibold">{match.awayTeam.name}</span>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-green-600">{match.awayTeam.score}</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="bg-blue-100 p-3 rounded-lg">
              <div className="flex items-center gap-1 mb-2">
                <Play className="h-3 w-3" />
                <span className="font-semibold">MATCH EVENTS</span>
              </div>
              <div className="space-y-1">
                {match.events.slice(0, 2).map((event, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 font-medium">{event.time}</span>
                    <span className="text-xs truncate flex-1">{event.player}</span>
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        event.type === "goal"
                          ? "bg-green-500"
                          : event.type === "yellow"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    ></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-100 p-3 rounded-lg">
              <div className="flex items-center gap-1 mb-2">
                <TrendingUp className="h-3 w-3" />
                <span className="font-semibold">LIVE ODDS</span>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-700">Match Winner</div>
                <div className="flex justify-between text-xs">
                  <span>{match.homeTeam.code}</span>
                  <span className="font-bold">{match.odds.home}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Draw</span>
                  <span className="font-bold">{match.odds.draw}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>{match.awayTeam.code}</span>
                  <span className="font-bold">{match.odds.away}</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-100 p-3 rounded-lg">
              <div className="flex items-center gap-1 mb-2">
                <Users className="h-3 w-3" />
                <span className="font-semibold">MATCH STATS</span>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-700">Possession</div>
                <div className="flex justify-between text-xs">
                  <span>{match.homeTeam.code}</span>
                  <span className="font-bold">{match.stats.possession.home}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>{match.awayTeam.code}</span>
                  <span className="font-bold">{match.stats.possession.away}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right TV Channels */}
        <div className="lg:col-span-3 bg-blue-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Tv className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-800">TV Channels</span>
            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
              {tvChannels.length}
            </span>
          </div>
          <div className="text-xs text-blue-600 mb-3">Live Broadcasting</div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            {tvChannels.map((channel, idx) => (
              <div key={idx} className="bg-white p-2 rounded-lg text-center">
                <div className="text-base lg:text-lg mb-1">{channel.logo}</div>
                <div className="text-xs font-medium text-blue-800 truncate" title={channel.name}>
                  {channel.name}
                </div>
                <div className="text-xs text-blue-600 truncate">{channel.region}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        <button className="bg-green-600 hover:bg-green-700 text-white flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 px-2 text-xs sm:text-sm font-medium transition-colors">
          <Ticket className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-center">BUY TICKETS</span>
        </button>
        <button className="bg-teal-600 hover:bg-teal-700 text-white flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 px-2 text-xs sm:text-sm font-medium transition-colors">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-center">PLAN A TRIP</span>
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 px-2 text-xs sm:text-sm font-medium transition-colors">
          <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-center">SHOP</span>
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 text-white flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 px-2 text-xs sm:text-sm font-medium transition-colors">
          <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-center">ENGAGE</span>
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 px-2 text-xs sm:text-sm font-medium transition-colors">
          <Tv className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-center">WATCH ONLINE/TV</span>
        </button>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 px-2 text-xs sm:text-sm font-medium transition-colors">
          <Headphones className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-center">READ, LISTEN & MORE</span>
        </button>
      </div>
    </div>
  )
}

