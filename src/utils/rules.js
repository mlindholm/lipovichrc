export const courseRules = [
  {
    id: 1,
    name: 'Progress',
    points: -2,
    label: '-2 pts',
    description: 'Shall be awarded to drivers for each gate after it has been cleared during the attempt of a course. All gate penalties are assessed and given before a progress bonus is awarded. Progress is awarded when during the same attempt and in the intended course direction at least one front and one rear tire passes completely through the gate. To receive the progress bonus without a gate penalty, all four tires must pass completely through the gate during the same attempt and in the intended course direction. Progress points are deducted from the total course score. Once a driver has pointed out, no further Progress points will be awarded.'
  },
  {
    id: 2,
    name: 'Reverse',
    points: 1,
    label: '1 pt',
    description: 'Point is given when a vehicle reverses course after making forward progress. Reversing is defined as any of the tires moving in the reverse direction, whether engaged or in freewheel and/or whether intentional or not. Once a reverse penalty is given, no further reverse penalty can be given until the vehicle makes forward progress. No penalty is given if the backward movement occurs while the vehicle is in the rollover position. If a driver begins a course in reverse, a reverse penalty will occur immediately.'
  },
  {
    id: 3,
    name: 'Self Recovery',
    points: 3,
    label: '3 pts',
    description: 'A self-recovery penalty will be assessed every time the vehicles winch cable is connected/reconnected, or self-recovery tools are positioned/repositioned. If at any time during the process of removing recovery tools and/or winch line from vehicle, the vehicle is moved by any force other than it’s winch or its own power, a touch penalty will be assessed and the vehicle repositioned to the last cleared gate (see vehicle touch rule). All self-recovery tools (sand ladders, etc.) must be carried on the vehicle.'
  },
  {
    id: 4,
    name: 'Rollover',
    points: 5,
    label: '5 pts',
    description: 'Points are given when vehicles rollover, and cannot be corrected without touching. Once the vehicle has stopped it may be rolled over and the 5-point penalty shall be given. Vehicles that land back on their wheels are not penalized. No reverse penalties are given until vehicle is up righted and back on all 4 tires. Drivers must execute a legal roll over recovery, or they will be given a reposition penalty.'
  },
  {
    id: 5,
    name: 'Gate Marker',
    points: 10,
    label: '10 pts each',
    description: 'Each gate will be comprised of 2 gate markers. Points are given when 4 wheels do not travel between gate markers or any part of the vehicle touches a gate marker. A gate marker will remain “live” for the entire duration of the attempt on the course. Gate markers that are moved by anything other than the vehicle’s actions will be replaced immediately before the driver is allowed to continue. Once any gate marker has been touched by the vehicle, no more penalties will be given for that gate marker. Only when a gate penalty is assessed will that gate marker be deemed “dead”. No further penalties will be assessed at this point for that gate marker.'
  },
  {
    id: 6,
    name: 'Boundary Marker',
    points: 10,
    label: '10 pts each',
    description: 'Points are given when any part of the vehicle touches a boundary marker. Once a boundary marker is touched the judge then will stop time, and the vehicle is then moved back by the driver to the previously cleared gate with the rear axle aligned to that gate. If the vehicle cannot be aligned to the gate due to course design, the judge will reposition the vehicle to the next stable location after the cleared gate. This location will be used for all drivers. A boundary marker will remain live (and will be replaced immediately if moved.) for the entire duration of the attempt on the course, and if they are moved out of position they will be replaced immediately before the driver is allowed to continue. Boundary markers are not required in the design of a course.'
  },
  {
    id: 7,
    name: 'Vehicle Touch',
    points: 10,
    label: '10 pts',
    description: 'All vehicle touches excluding “Rollovers” are given an automatic 10 points. The judge will stop time when the driver requests a vehicle touch or the judge calls a touch penalty. The vehicle is then moved by the driver to the previously cleared gate with the rear axle aligned to that gate. If the vehicle cannot be aligned to the gate due to course design, the judge will reposition the vehicle to the next stable location after the cleared gate. This location will be used for all drivers. Note: All gates for progress are still “live” unless a gate has already been deemed “dead”.'
  },
  {
    id: 8,
    name: 'Course Direction',
    points: 10,
    label: '10 pts',
    description: 'Gates must be cleared in their intended direction and sequence. If the vehicle progresses an un-cleared gate in the wrong direction, or out of sequence will result in a 10-point penalty and the judge will stop time. (Progress is at least one front and one rear tire needs to be completely through the gate). The vehicle is then moved back by the driver to the previously cleared gate with the rear axle aligned to that gate. If the vehicle cannot be aligned to the gate due to course design, the judge will reposition the vehicle to the next stable location after the cleared gate. This location will be used for all drivers. Once progress is awarded for a specific gate, it can be passed through in any sequence or direction.'
  },
  {
    id: 9,
    name: 'DNF',
    points: 40,
    label: '40 pts',
    description: 'Points are given anytime a driver cannot complete a course for any reason. (Time expired, Point-Out, Vehicle not Repairable, etc) Progress points are awarded for each gate completed.',
    max: 1
  },
]
