export const courseRules = [
  {
    id: 1,
    name: 'Progress',
    points: -2,
    description: 'Progress Bonus: (-2 progress point) shall be awarded to drivers for each gate that is cleared by the vehicle during the attempt of a course. A gate is considered cleared and a progress bonus shall be given when at least one front and one rear tire passes completely through the gate in the intended direction of the gate. All tires must pass completely through the gate to receive the progress bonus without a gate penalty. A 10 point gate penalty shall be given if all tires do not clear the gate, even if no gate marker is touched or straddled. The tires of the vehicle must travel completely through the gate, and not just break the plane of the gate. Tires must pass through the gate in the same direction and in the same attempt before a progress bonus is awarded. These points are deducted from the total course score. Once a driver has pointed out, no further progress points will be awarded.'
  },
  {
    id: 2,
    name: 'Reverse',
    points: 1,
    description: 'Back Up/Reverse: (+1 pt) point is given when a vehicle reverses course after making forward progress. Reversing is defined as at any time if any of the tires move the vehicle backward or spin in the reverse direction, whether engaged or in freewheel and/or whether intentional or not. Once a reverse penalty is given, no further reverse penalty can be given until the vehicle makes forward progress. No penalty is given if the backward movement is part of a penalized rollover. If a driver begins a course in reverse, a reverse penalty will occur immediately.'
  },
  {
    id: 3,
    name: 'Self Recovery',
    points: 3,
    description: 'Self-Recovery: (+3 pts each) A self-recovery penalty will be assessed every time the vehicles winch cable is connected/reconnected, or self-recovery tools are positioned/repositioned. If at any time during the process of removing recovery tools and/or winch line from vehicle, the vehicle is moved by any force other than it’s winch or its own power, a touch penalty will be assessed and the vehicle repositioned to the last cleared gate (see vehicle touch rule). All self-recovery tools (sand ladders, etc.) must be carried on the vehicle.'
  },
  {
    id: 4,
    name: 'Rollover',
    points: 5,
    description: 'Rollover: (+5 pts) Points are given when a vehicle rolls over and cannot be corrected without touching. Once the vehicle has stopped it may be rolled back onto its wheels and a +5 point penalty shall be given. Vehicles that land back on their wheels without assistance are not penalized. No reverse penalties will be awarded until the vehicle is righted. The vehicle may at no time be lifted, slid or moved in any way other than a smooth, continuous roll to the left or right side only. Any other manipulation or movement of the vehicle will be considered a "vehicle touch" penalty.'
  },
  {
    id: 5,
    name: 'Gate, Boundary, Direction',
    points: 10,
    description: 'Gate Marker: (+10 pts each) Each gate will be comprised of 2 gate markers. Points are given when all wheels do not travel between gate markers or any part of the vehicle, a tow strap or winch line touches a gate marker. A gate marker will remain "live" for the entire duration of the attempt on the course. Once any gate marker has been touched or straddled, no more penalties will be given for that gate marker. Only when a gate penalty is assessed will that gate marker be deemed "dead". No further penalties will be assessed at this point for that gate marker. There will no longer be a penalty for stepping on a gate (for safety reasons) but please stay off course as much as possible and limit course damage. \n\nBoundary Marker: (+10 pts each) Points are given when any part of the vehicle touches a boundary marker. Once a boundary marker is touched the judge then will stop time, and the vehicle is then moved back by the driver to the previously cleared gate with the rear axle aligned to that gate. If the vehicle cannot be aligned to the gate due to course design, the judge will reposition the vehicle to the next stable location after the cleared gate. This location will be used for all drivers. A boundary marker will remain "live" for the entire duration of the attempt on the course, and should be replaced if moved. Boundary markers are not required in the design of a course. \n\nCourse Direction: (+10 pts) Gates must be cleared in their intended direction and sequence. Any part of the vehicle entering an non-cleared gate in the wrong direction, or driven through out of sequence will result in a +10 point penalty. The judge will stop time. The vehicle is then moved back to the previously cleared gate (see reposition rule). Once the gate is cleared and awarded progress it can be traveled in any sequence or direction.'
  },
  {
    id: 6,
    name: 'Touch, Reposition',
    points: 10,
    description: 'Vehicle Touch: (+10 pts) All vehicle touches excluding “rollovers”, "winching", "assisted recoveries" (see associated rules), intentional or unintentional, are given an automatic +10 points. The judge then will stop time when either the driver calls for a vehicle touch or the judge calls a driver touch. The vehicle is then moved back by the driver to the previously cleared gate with the rear axle aligned to that gate. If the vehicle cannot be aligned to the gate due to course design, the judge will reposition the vehicle to the next stable location after the cleared gate. This location will be used for all drivers. Note: All gates for progress are still “live” unless a gate has already been deemed “dead”. Vehicle touches include but are not limited to: repairs, repositions, vehicle driving/falling into the driver. \n\nReposition: (+10 pts) The vehicle will be placed with its rear tires in the last gate progressed or the nearest stable location after the last cleared gate if the last gate cleared is unstable.'
  },
  {
    id: 5,
    name: 'Repairs',
    points: 10,
    description: 'On-Course Repairs: (+10pts) Must be completed on course and in the spot of which the driver decided to take the repair. Repairs must be made within the course time, while the course timer will continue to run. If repairs are made within the course time, the driver must return to the last previous gate cleared. If repairs cannot be made within the course time, the driver is given a DNF minus progress points for that course. There are no restrictions on whom or how the repairs are made. \n\nOff-Course Repairs: (+10pts) A driver can call time to make an off-course repair. Repairs should be completed within 30 minutes, or the driver is given a DNF minus progress points. If the repair is made in the allotted time, the driver must return to the last previous gate cleared. A 1 minute time penalty will be subtracted from the time that is left on that course, the timer will continue once the vehicle makes forward progress.'
  },
  {
    id: 7,
    name: 'Did not finish',
    points: 80 + 20,
    description: 'DNF (Did Not Finish): (point out +20 pts) given anytime a driver cannot complete a course. Progress then Scale points are awarded after. (80 + 20 - progress - scale points.)',
    max: 1
  },
]
