import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, Star } from "lucide-react";
import Navbar from "../Navbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)

export default function DoctorProfile() {
  const { id: doctorId } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [stories, setStories] = useState([])
  const [slots, setSlots] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`https://backend-453n.onrender.com/api/doctors/doctors/${doctorId}`)
        const data = await res.json()
        setDoctor(data)
      } catch (err) {
        console.error("Error fetching doctor:", err)
      }
    }

    const fetchStories = async () => {
      try {
        const res = await fetch(`https://backend-453n.onrender.com/api/stories/doctor/${doctorId}`)
        const data = await res.json()
        setStories(data)
      } catch (err) {
        console.error("Error fetching stories:", err)
      }
    }

    fetchDoctor()
    fetchStories()
  }, [doctorId])

  useEffect(() => {
    if (selectedDate) {
      const fetchSlots = async () => {
        try {
          // const formattedDate = selectedDate.toISOString().split("T")[0]
          const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");

          const res = await fetch(`https://backend-453n.onrender.com/api/appointments/slots?doctorId=${doctorId}&date=${formattedDate}`)
          const data = await res.json()
          setSlots(data.slots || [])
        } catch (err) {
          console.error("Error fetching slots:", err)
        }
      }

      fetchSlots()
    }
  }, [selectedDate, doctorId])

  if (!doctor) return <div className="p-10 text-center text-lg">Loading doctor profile...</div>

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Doctor Info */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.fullname} />
                  <AvatarFallback>{doctor.fullname?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold">{doctor.fullname}</h1>
                <p className="text-muted-foreground">{doctor.specialization}</p>
                <div className="flex items-center mt-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">({doctor.stories.length || 0} reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-3 py-1">
                    Age: {doctor.age}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    {doctor.experience}+ Years Experience
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{doctor.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Mon-Sun: Dynamic Slots</span>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">{doctor.description}</p>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium mb-2">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specialization && <Badge>{doctor.specialization}</Badge>}
                    {doctor.subspecialization?.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <div className="md:col-span-2">
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="stories">Patient Stories</TabsTrigger>
              </TabsList>

              {/* Appointments Tab */}
              <TabsContent value="appointments" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <CalendarDays className="mr-2 h-5 w-5" />
                      <h2 className="text-xl font-semibold">Schedule an Appointment</h2>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      Select a date to view available appointment slots.
                    </p>
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />

                    {selectedDate && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Available Time Slots</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {slots.map(({ startTime, status }) => (
                            <button
                              key={startTime}
                              disabled={status === "booked"}
                              className={`py-2 px-4 text-sm border rounded-md transition-colors ${
                                status === "booked" ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "hover:bg-muted"
                              }`}
                            >
                              {startTime}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Patient Stories Tab */}
              <TabsContent value="stories" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Patient Stories</h2>
                    <div className="space-y-6">
                      {stories.length === 0 && (
                        <p className="text-sm text-muted-foreground">No stories shared yet.</p>
                      )}

                      {stories.map((story) => (
                        <div key={story._id} className="border rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>{story.user?.fullname?.[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{story.user?.fullname}</h4>
                              <div className="flex items-center">
                                {Array(5).fill(0).map((_, j) => (
                                  <Star
                                    key={j}
                                    className={`h-3 w-3 ${
                                      story.recommended && j < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="ml-2 text-xs text-muted-foreground">
                                  {dayjs(story.submittedAt).fromNow()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{story.story}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}