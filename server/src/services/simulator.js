export function simulateIntervention({
  wardPopulation = 48000,
  coolingCentres = 0,
  waterTankers = 0,
  medicalTeams = 0
}) {
  const interventionStrength =
    coolingCentres * 6 +
    waterTankers * 3 +
    medicalTeams * 4;

  const reduction = Math.min(interventionStrength, 45);

  const after = Math.round(
    wardPopulation * (1 - reduction / 100)
  );

  return {
    before: wardPopulation,
    after,
    reduction,
    details: {
      coolingCentresImpact: coolingCentres * 6,
      waterTankersImpact: waterTankers * 3,
      medicalTeamsImpact: medicalTeams * 4
    }
  };
}
