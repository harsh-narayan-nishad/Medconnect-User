import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Clock, MapPin, Star, Loader2 } from "lucide-react";
import Navbar from "../Navbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DialogDescription } from "@radix-ui/react-dialog";

import { authFetch } from "@/utils/authFetch";
import Loader from "../../ui/Loader";
dayjs.extend(relativeTime)

export default function DoctorProfile() {
  const { id: doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [stories, setStories] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visitedFor, setVisitedFor] = useState("");
  const [recommend, setRecommend] = useState(null);
  const [storyText, setStoryText] = useState("");
  const [submitting, setSubmitting] = useState(false);


  const { toast } = useToast();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`https://backend-453n.onrender.com/api/doctors/doctors/${doctorId}`);
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        console.error("Error fetching doctor:", err);
      }
    };

    const fetchStories = async () => {
      try {
        const res = await fetch(`https://backend-453n.onrender.com/api/stories/doctor/${doctorId}`);
        const data = await res.json();
        setStories(data);
      } catch (err) {
        console.error("Error fetching stories:", err);
      }
    };

    fetchDoctor();
    fetchStories();
  }, [doctorId]);

  useEffect(() => {
    if (selectedDate) {
      const fetchSlots = async () => {
        try {
          const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
          const res = await fetch(`https://backend-453n.onrender.com/api/appointments/slots?doctorId=${doctorId}&date=${formattedDate}`);
          const data = await res.json();
          setSlots(data.slots || []);
        } catch (err) {
          console.error("Error fetching slots:", err);
        }
      };

      fetchSlots();
    }
  }, [selectedDate, doctorId]);

  // const handleConfirmAppointment = async () => {
  //   setLoading(true);
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await fetch("https://backend-453n.onrender.com/api/appointments/request", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         doctorId,
  //         date: dayjs(selectedDate).format("YYYY-MM-DD"),
  //         startTime: selectedSlot,
  //       }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       toast({
  //         title: "Appointment Requested",
  //         description: `Your request has been sent for ${selectedSlot}`,
  //       });
  //       setSelectedSlot(null);
  //     } else {
  //       toast({
  //         title: "Failed to Send Request",
  //         description: data.message || "Something went wrong.",
  //         variant: "destructive",
  //       });
  //     }
  //   } catch (err) {
  //     console.error("Error:", err);
  //     toast({
  //       title: "Error",
  //       description: "Something went wrong.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setLoading(false);
  //     setShowDialog(false);
  //   }
  // };

  // const handleSubmitStory = async () => {
  //   if (!visitedFor || recommend === null || !storyText) {
  //     return toast({
  //       title: "Missing Fields",
  //       description: "Please fill out all fields before submitting.",
  //       variant: "destructive",
  //     });
  //   }
  
  //   setSubmitting(true);
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await fetch("https://backend-453n.onrender.com/api/stories/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         doctorId,
  //         visitedFor,
  //         recommend,
  //         story: storyText,
  //       }),
  //     });
  
  //     const data = await res.json();
  
  //     if (res.ok) {
  //       toast({
  //         title: "Story Submitted",
  //         description: "Thanks for sharing your experience!",
  //       });
  //       setVisitedFor("");
  //       setRecommend(null);
  //       setStoryText("");
  //       setStories((prev) => [data.story, ...prev]); // optimistically update UI
  //     } else {
  //       toast({
  //         title: "Failed to submit story",
  //         description: data.message || "Please try again.",
  //         variant: "destructive",
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast({
  //       title: "Error",
  //       description: "Something went wrong. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
  const handleConfirmAppointment = async () => {
    setLoading(true);
    try {
      const res = await authFetch("/api/appointments/request", {
        method: "POST",
        body: JSON.stringify({
          doctorId,
          date: dayjs(selectedDate).format("YYYY-MM-DD"),
          startTime: selectedSlot,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast({
          title: "Appointment Requested",
          description: `Your request has been sent for ${selectedSlot}`,
        });
        setSelectedSlot(null);
      } else {
        toast({
          title: "Failed to Send Request",
          description: data.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setShowDialog(false);
    }
  };

const handleSubmitStory = async () => {
  if (!visitedFor || recommend === null || !storyText) {
    return toast({
      title: "Missing Fields",
      description: "Please fill out all fields before submitting.",
      variant: "destructive",
    });
  }

  setSubmitting(true);
  try {
    const res = await authFetch("/api/stories/add", {
      method: "POST",
      body: JSON.stringify({
        doctorId,
        visitedFor,
        recommended: recommend,
        story: storyText,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast({
        title: "Story Submitted",
        description: "Thanks for sharing your experience!",
      });
      setVisitedFor("");
      setRecommend(null);
      setStoryText("");
      setStories((prev) => [data.story, ...prev]);
    } else {
      toast({
        title: "Failed to submit story",
        description: data.message || "Please try again.",
        variant: "destructive",
      });
    }
  } catch (err) {
    console.error(err);
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  } finally {
    setSubmitting(false);
  }
};


  if (!doctor) {
    // return <div className="p-10 text-center text-lg">Loading doctor profile...</div>;
    return <Loader />; // Use your Loader component here
  }
  if(!doctor) return <Loader />

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
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({doctor.stories?.length || 0} reviews)
                  </span>
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
                              onClick={() => {
                                setSelectedSlot(startTime);
                                setShowDialog(true);
                              }}
                              className={`py-2 px-4 text-sm border rounded-md transition-colors ${
                                status === "booked"
                                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                  : "hover:bg-muted"
                              } ${selectedSlot === startTime ? "bg-primary text-white" : ""}`}
                            >
                              {startTime}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <Dialog open={showDialog} onOpenChange={setShowDialog}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Appointment</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          You're about to request an appointment with <b>{doctor.fullname}</b> on{" "}
                          <b>{dayjs(selectedDate).format("MMMM D, YYYY")}</b> at <b>{selectedSlot}</b>.
                        </DialogDescription>
                        <DialogFooter className="mt-4">
                          <Button variant="outline" onClick={() => setShowDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleConfirmAppointment} disabled={loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Patient Stories Tab */}
              <TabsContent value="stories" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Patient Stories</h2>
                    <div className="space-y-6">
                      {stories.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No stories shared yet.</p>
                      ) : (
                        stories.map((story) => (
                          <div key={story._id} className="border rounded-lg p-4">
                            <div className="flex items-center mb-3">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback>{story.user?.fullname?.[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{story.user?.fullname}</h4>
                                <div className="flex items-center">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, j) => (
                                      <Star
                                        key={j}
                                        className={`h-3 w-3 ${
                                          story.recommend && j < 5
                                            ? "text-yellow-500 fill-yellow-500"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  <span className="ml-2 text-xs text-muted-foreground">
                                    {dayjs(story.createdAt).fromNow()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{story.story}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Add Story Button and Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-6">Share Your Experience</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share Your Story</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Visited For</label>
                        <input
                          type="text"
                          value={visitedFor}
                          onChange={(e) => setVisitedFor(e.target.value)}
                          className="border rounded px-3 py-2 text-sm"
                          placeholder="e.g., Chest pain, fever, etc."
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Do You Recommend This Doctor?</label>
                        {/* <select
                          value={recommend}
                          onChange={(e) => setRecommend(e.target.value === "yes")}
                          className="border rounded px-3 py-2 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select> */}
                        <select
                          value={recommend === null ? "" : recommend ? "yes" : "no"}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "") setRecommend(null);
                            else if (value === "yes") setRecommend(true);
                            else if (value === "no") setRecommend(false);
                          }}
                          className="border rounded px-3 py-2 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Your Story</label>
                        <textarea
                          value={storyText}
                          onChange={(e) => setStoryText(e.target.value)}
                          className="border rounded px-3 py-2 text-sm"
                          rows={4}
                          placeholder="Describe your experience..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSubmitStory} disabled={submitting}>
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Story"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}