"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, set, subDays } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { userSettings } from "@/data/data";
import { getUnavailableDays } from "@/utils/getUnavailableDays";
import { getAvailableHours } from "@/utils/getAvailableHours";
import { Input } from "../ui/input";
import { Appointment } from "@prisma/client";

const FormSchema = z.object({
  date: z.date({
    required_error: "La fecha es requerida",
  }),
  time: z
    .string({ required_error: "La hora es requerida" })
    .min(1, { message: "La hora es requerida" }),
  name: z
    .string({ required_error: "El nombre es requerido" })
    .min(1, { message: "El nombre es requerido" }),
});

export function CalendarForm({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const [times, setTimes] = useState([""]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: undefined,
      time: "",
      name: "",
    },
  });

  // Traer userSettings de la DB
  const unavailableDates = getUnavailableDays(userSettings.availableDays);

  useEffect(() => {
    const date = form.getValues("date");
    if (!date) return;
    const times = getAvailableHours(userSettings, date, appointments);
    setTimes(times);
  }, [form.watch("date")]);

  const disabledDates = [
    ...unavailableDates,
    {
      from: new Date(0, 0, 0),
      to: subDays(new Date(), 1),
    },
  ];

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const [hours, minutes] = data.time.split(":");
    const formattedDate = set(data.date, {
      hours: Number(hours),
      minutes: Number(minutes),
    });

    try {
      const res = await axios.post("/api/appointments", {
        name: data.name,
        date: formattedDate,
      });
      toast({
        title: "Form submitted!",
        description: (
          <div>
            <p>{data.name}</p>
            <p className="capitalize">
              {format(data.date, "cccc d MMMM yyyy", { locale: es })}
            </p>
            <p>{formattedDate.toString()}</p>
            <p>{data.time}</p>
          </div>
        ),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Brad Pitt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Elegí una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      console.log(date);
                      field.onChange(date);
                      form.setValue("time", "");
                    }}
                    disabled={disabledDates}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Horario" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px]">
                  {times.length > 1 ? (
                    times.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time} {Number(time.split(":")[0]) >= 12 ? "PM" : "AM"}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="No hay horarios disponibles" disabled>
                      No hay horarios disponibles
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Pedir</Button>
      </form>
    </Form>
  );
}
