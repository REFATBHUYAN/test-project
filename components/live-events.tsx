"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Clock,
  MapPin,
  Tv,
  RefreshCw,
  AlertCircle,
  Wifi,
  WifiOff,
  Trophy,
  ExternalLink,
  ChevronDown,
  Globe,
  Calendar,
  Share,
  Star,
  ShoppingBag,
  MessageCircle,
  Play,
  BookOpen,
  Headphones,
  Ticket,
  Map,
  Zap,
  Gift,
  Percent,
  Settings,
  Columns,
  Square,
  LayoutGrid,
  Github,
  Users,
  TrendingUp,
  Heart
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface SportsDBEvent {
  idEvent: string
  strEvent: string
  strLeague: string
  strSport: string
  strHomeTeam: string
  strAwayTeam: string
  idHomeTeam: string
  idAwayTeam: string
  dateEvent: string
  strTime: string
  strStatus: string
  strVenue: string | null
  strCity: string | null
  strCountry: string | null
  strTVStation: string | null
  intHomeScore: string | null
  intAwayScore: string | null
  strHomeTeamBadge: string | null
  strAwayTeamBadge: string | null
}

interface ApiResponse {
  success: boolean
  events: SportsDBEvent[]
  total: number
  error?: string
  timestamp?: string
  source?: string
}

interface LayoutSettings {
  showMicroAds: boolean
  showTVChannels: boolean
  showVenueInfo: boolean
  showActionButtons: boolean
  compactMode: boolean
  autoRefresh: boolean
  refreshInterval: number
  maxEvents: number
  theme: "light" | "dark" | "auto"
}

const SPORT_COLORS: Record<string, string> = {
  Football: "from-green-500 to-green-600",
  Soccer: "from-green-500 to-green-600",
  Basketball: "from-orange-500 to-orange-600",
  Cricket: "from-blue-500 to-blue-600",
  Tennis: "from-yellow-500 to-yellow-600",
  Rugby: "from-red-500 to-red-600",
  "American Football": "from-purple-500 to-purple-600",
  Baseball: "from-blue-600 to-blue-700",
  Golf: "from-green-600 to-green-700",
  "Formula 1": "from-red-500 to-red-600",
  Boxing: "from-purple-500 to-purple-600",
  "Ice Hockey": "from-blue-400 to-blue-500",
  Motorsport: "from-gray-600 to-gray-700",
}

const SPORT_EMOJIS: Record<string, string> = {
  Football: "⚽",
  Soccer: "⚽",
  Basketball: "🏀",
  Cricket: "🏏",
  Tennis: "🎾",
  Rugby: "🏉",
  "American Football": "🏈",
  Baseball: "⚾",
  Golf: "⛳",
  "Formula 1": "🏎️",
  Boxing: "🥊",
  "Ice Hockey": "🏒",
  Motorsport: "🏁",
}

interface LiveEventsProps {
  layout?: "grid" | "wide" | "single"
  title?: string
}

export function LiveEvents({ layout = "single", title = "Live Sports Events" }: LiveEventsProps) {
  const [events, setEvents] = useState<SportsDBEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    showMicroAds: true,
    showTVChannels: true,
    showVenueInfo: true,
    showActionButtons: true,
    compactMode: false,
    autoRefresh: true,
    refreshInterval: 120000,
    maxEvents: 6,
    theme: "light",
  })

  // Mock data for demonstration
  const mockEvents: SportsDBEvent[] = [
    {
      idEvent: "1",
      strEvent: "Manchester United vs Liverpool",
      strLeague: "Premier League",
      strSport: "Soccer",
      strHomeTeam: "Manchester United",
      strAwayTeam: "Liverpool",
      idHomeTeam: "133604",
      idAwayTeam: "133602",
      dateEvent: "2025-10-26",
      strTime: "94'",
      strStatus: "LIVE",
      strVenue: "Old Trafford",
      strCity: "Manchester",
      strCountry: "England",
      strTVStation: "Sky Sports, NBC Sports, ESPN, Fox Sports, TNT, beIN Sports",
      intHomeScore: "2",
      intAwayScore: "1",
      strHomeTeamBadge: null,
      strAwayTeamBadge: null,
    },
    {
      idEvent: "2",
      strEvent: "Lakers vs Warriors",
      strLeague: "NBA",
      strSport: "Basketball",
      strHomeTeam: "LA Lakers",
      strAwayTeam: "Golden State Warriors",
      idHomeTeam: "134865",
      idAwayTeam: "134866",
      dateEvent: "2025-10-26",
      strTime: "76'",
      strStatus: "LIVE",
      strVenue: "Crypto.com Arena",
      strCity: "Los Angeles",
      strCountry: "USA",
      strTVStation: "TNT, ESPN, ABC, NBA TV, Fox Sports, CBS Sports",
      intHomeScore: "98",
      intAwayScore: "94",
      strHomeTeamBadge: null,
      strAwayTeamBadge: null,
    },
    {
      idEvent: "3",
      strEvent: "Real Madrid vs Barcelona",
      strLeague: "La Liga",
      strSport: "Soccer",
      strHomeTeam: "Real Madrid",
      strAwayTeam: "Barcelona",
      idHomeTeam: "134301",
      idAwayTeam: "134302",
      dateEvent: "2025-10-26",
      strTime: "67'",
      strStatus: "1H",
      strVenue: "Santiago Bernabéu",
      strCity: "Madrid",
      strCountry: "Spain",
      strTVStation: "ESPN+, beIN Sports, Canal+, Sky Sports",
      intHomeScore: "1",
      intAwayScore: "0",
      strHomeTeamBadge: null,
      strAwayTeamBadge: null,
    }
  ]

  const fetchLiveEvents = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    // Simulate API call
    setTimeout(() => {
      setEvents(mockEvents)
      setLastUpdated(new Date())
      setIsOnline(true)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    fetchLiveEvents()
    if (layoutSettings.autoRefresh) {
      const interval = setInterval(fetchLiveEvents, layoutSettings.refreshInterval)
      return () => clearInterval(interval)
    }
  }, [fetchLiveEvents, layoutSettings.autoRefresh, layoutSettings.refreshInterval])

  const isEventLive = (event: SportsDBEvent): boolean => {
    const liveStatuses = ["LIVE", "IN PLAY", "1H", "2H", "HT", "ET", "PEN"]
    return liveStatuses.some((status) => event.strStatus?.toUpperCase().includes(status))
  }

  const formatTime = (timeStr: string): string => {
    if (!timeStr) return "TBA"
    return timeStr.includes("'") ? timeStr : timeStr.substring(0, 5)
  }

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "TBA"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getTeamInitials = (teamName: string): string => {
    return teamName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 3)
      .toUpperCase()
  }

  const TeamBadge = ({
    teamName,
    size = 32,
    sportType = "Soccer"
  }: { teamName: string; size?: number; sportType?: string }) => {
    const colorClass = SPORT_COLORS[sportType] || "from-blue-500 to-purple-600"
    return (
      <div
        className={`bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center text-white font-bold shadow-lg`}
        style={{ width: size, height: size }}
      >
        <span style={{ fontSize: size * 0.3 }}>{getTeamInitials(teamName)}</span>
      </div>
    )
  }

  // Single Layout Card Component inspired by SportsMatchDisplay
  const SingleLayoutCard = ({ event }: { event: SportsDBEvent }) => {
    const isLive = isEventLive(event)
    const sportColor = SPORT_COLORS[event.strSport] || "from-purple-600 to-purple-700"
    const sportEmoji = SPORT_EMOJIS[event.strSport] || "🏆"
    
    const tvChannels = event.strTVStation ? event.strTVStation.split(",").map(s => s.trim()) : []

    return (
      <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0 mb-6">
        {/* Header Section */}
        <div className={`bg-gradient-to-r ${sportColor} text-white px-6 py-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">{formatDate(event.dateEvent)}</span>
              </div>
              {isLive && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-red-300">LIVE</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-lg font-bold">{formatTime(event.strTime)}</span>
              </div>
            </div>

            {layoutSettings.showMicroAds && (
              <div className="hidden md:flex gap-2">
                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-sm font-medium transition-colors">
                  BETTING <span className="text-xs">50% Bonus</span>
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-medium transition-colors">
                  GEAR <span className="text-xs">30% Off</span>
                </button>
                <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm font-medium transition-colors">
                  TRAVEL <span className="text-xs">Book Now</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[200px]">
          {/* Left Team Section */}
          <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 to-purple-700 text-white flex flex-col items-center justify-center relative">
            <div className="absolute top-4 left-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">{sportEmoji}</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs font-medium mb-2">{event.strSport.toUpperCase()}</div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-center">
                  <TeamBadge teamName={event.strHomeTeam} size={48} sportType={event.strSport} />
                  <div className="text-xs font-medium mt-1">{getTeamInitials(event.strHomeTeam)}</div>
                </div>
                <div className="text-white/60 text-sm font-bold">VS</div>
                <div className="text-center">
                  <TeamBadge teamName={event.strAwayTeam} size={48} sportType={event.strSport} />
                  <div className="text-xs font-medium mt-1">{getTeamInitials(event.strAwayTeam)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Match Info */}
          <div className="lg:col-span-7 bg-gray-50 p-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">LIVE MATCH CENTER</h3>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <TeamBadge teamName={event.strHomeTeam} size={24} sportType={event.strSport} />
                    <span className="text-lg font-semibold">{event.strHomeTeam}</span>
                  </div>
                  <div className="text-4xl font-bold text-blue-600">{event.intHomeScore || "0"}</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-400 mb-2">VS</div>
                  <div className={`w-3 h-3 bg-gradient-to-r ${sportColor} rounded-full mx-auto animate-pulse`}></div>
                </div>

                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <TeamBadge teamName={event.strAwayTeam} size={24} sportType={event.strSport} />
                    <span className="text-lg font-semibold">{event.strAwayTeam}</span>
                  </div>
                  <div className="text-4xl font-bold text-green-600">{event.intAwayScore || "0"}</div>
                </div>
              </div>
            </div>

            {/* Info Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-blue-100 p-3 rounded">
                <div className="flex items-center gap-1 mb-1">
                  <Play className="h-3 w-3" />
                  <span className="font-semibold">MATCH STATUS</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium">Current Status</div>
                  <div className="flex justify-between text-xs">
                    <span>Status</span>
                    <span className="font-bold">{event.strStatus}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>League</span>
                    <span className="font-bold">{event.strLeague}</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-100 p-3 rounded">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="h-3 w-3" />
                  <span className="font-semibold">VENUE INFO</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium">Stadium</div>
                  <div className="text-xs font-bold">{event.strVenue || "TBA"}</div>
                  <div className="text-xs">{event.strCity}, {event.strCountry}</div>
                </div>
              </div>

              <div className="bg-purple-100 p-3 rounded">
                <div className="flex items-center gap-1 mb-1">
                  <Users className="h-3 w-3" />
                  <span className="font-semibold">MATCH STATS</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium">Live Data</div>
                  <div className="flex justify-between text-xs">
                    <span>Time</span>
                    <span className="font-bold">{formatTime(event.strTime)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Sport</span>
                    <span className="font-bold">{event.strSport}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right TV Channels */}
          {layoutSettings.showTVChannels && (
            <div className="lg:col-span-3 bg-blue-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tv className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-800">TV Channels</span>
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                  {tvChannels.length}
                </span>
              </div>
              <div className="text-xs text-blue-600 mb-3">Live Broadcasting</div>

              <div className="grid grid-cols-3 gap-2">
                {tvChannels.slice(0, 6).map((channel, idx) => (
                  <div key={idx} className="bg-white p-2 rounded text-center">
                    <div className="text-lg mb-1">📺</div>
                    <div className="text-xs font-medium text-blue-800 truncate" title={channel}>{channel}</div>
                    <div className="text-xs text-blue-600">Live</div>
                  </div>
                ))}
              </div>
              
              {tvChannels.length > 6 && (
                <div className="text-center mt-2">
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    +{tvChannels.length - 6} more channels
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {layoutSettings.showActionButtons && (
          <div className="grid grid-cols-3 md:grid-cols-6 h-[50px]">
            <button className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 text-sm font-medium transition-colors">
              <Ticket className="h-4 w-4" />
              BUY TICKETS
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center gap-2 text-sm font-medium transition-colors">
              <Map className="h-4 w-4" />
              PLAN A TRIP
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 text-sm font-medium transition-colors">
              <ShoppingBag className="h-4 w-4" />
              SHOP
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center gap-2 text-sm font-medium transition-colors">
              <Heart className="h-4 w-4" />
              ENGAGE
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 text-sm font-medium transition-colors">
              <Play className="h-4 w-4" />
              WATCH ONLINE/TV
            </button>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center gap-2 text-sm font-medium transition-colors">
              <Headphones className="h-4 w-4" />
              READ, LISTEN & MORE
            </button>
          </div>
        )}
      </Card>
    )
  }

  // Settings Panel
  const SettingsPanel = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Settings</h2>
            <Button variant="outline" size="sm" onClick={() => setShowSettings(false)}>
              Close
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-tv">Show TV Channels</Label>
              <Switch
                id="show-tv"
                checked={layoutSettings.showTVChannels}
                onCheckedChange={(checked) => 
                  setLayoutSettings(prev => ({ ...prev, showTVChannels: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-venue">Show Venue Info</Label>
              <Switch
                id="show-venue"
                checked={layoutSettings.showVenueInfo}
                onCheckedChange={(checked) => 
                  setLayoutSettings(prev => ({ ...prev, showVenueInfo: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-actions">Show Action Buttons</Label>
              <Switch
                id="show-actions"
                checked={layoutSettings.showActionButtons}
                onCheckedChange={(checked) => 
                  setLayoutSettings(prev => ({ ...prev, showActionButtons: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-ads">Show Micro Ads</Label>
              <Switch
                id="show-ads"
                checked={layoutSettings.showMicroAds}
                onCheckedChange={(checked) => 
                  setLayoutSettings(prev => ({ ...prev, showMicroAds: checked }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (isLoading && events.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showSettings && <SettingsPanel />}
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h2>
          <div className="flex items-center space-x-1">
            {isOnline ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-500" />
            )}
            <Trophy className="h-5 w-5 text-yellow-500" />
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-300 text-purple-700">
            Single Layout
          </Badge>
        </div>

        <div className="flex items-center space-x-3">
          {lastUpdated && (
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
              <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(true)}
            className="flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchLiveEvents}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-yellow-800 font-medium">Connection Issue</p>
              <p className="text-yellow-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      {events.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-700">No Live Events</h3>
            <p className="text-gray-600 mb-4">There are no live sports events at the moment.</p>
            <Button onClick={fetchLiveEvents} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {events.slice(0, layoutSettings.maxEvents).map((event) => (
            <SingleLayoutCard key={event.idEvent} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}


