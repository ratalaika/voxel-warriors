var Physics = {
	functionVoxelcol: null,
	
	init: function() {
		{
			Physics.functionVoxelcol = function(intX, intY, intZ) {
				return false;
			}
		}
	},
	
	dispel: function() {
		{
			Physics.functionVoxelcol = null;
		}
	},
	
	update: function(physicsHandle) {
		{
			physicsHandle.dblAcceleration[0] += physicsHandle.dblGravity[0];
			physicsHandle.dblAcceleration[1] += physicsHandle.dblGravity[1];
			physicsHandle.dblAcceleration[2] += physicsHandle.dblGravity[2];
		}
		
		{
			var dblVerletX = physicsHandle.dblPosition[0];
			var dblVerletY = physicsHandle.dblPosition[1];
			var dblVerletZ = physicsHandle.dblPosition[2];

			physicsHandle.dblPosition[0] = physicsHandle.dblPosition[0] + (physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0]) + physicsHandle.dblAcceleration[0];
			physicsHandle.dblPosition[1] = physicsHandle.dblPosition[1] + (physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1]) + physicsHandle.dblAcceleration[1];
			physicsHandle.dblPosition[2] = physicsHandle.dblPosition[2] + (physicsHandle.dblPosition[2] - physicsHandle.dblVerlet[2]) + physicsHandle.dblAcceleration[2];
			
			physicsHandle.dblVerlet[0] = dblVerletX;
			physicsHandle.dblVerlet[1] = dblVerletY;
			physicsHandle.dblVerlet[2] = dblVerletZ;
			
			physicsHandle.dblAcceleration[0] = 0.0;
			physicsHandle.dblAcceleration[1] = 0.0;
			physicsHandle.dblAcceleration[2] = 0.0;
		}
		
		{
			var dblVelocityX = physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0];
			var dblVelocityY = physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1];
			var dblVelocityZ = physicsHandle.dblPosition[2] - physicsHandle.dblVerlet[2];

			{
				dblVelocityX *= physicsHandle.dblFriction[0];
				dblVelocityY *= physicsHandle.dblFriction[1];
				dblVelocityZ *= physicsHandle.dblFriction[2];
			}
			
			{
				if (physicsHandle.dblMaxvel.length === 1) {
					{
						var dblLength = Math.sqrt((dblVelocityX * dblVelocityX) + (dblVelocityY * dblVelocityY) + (dblVelocityZ * dblVelocityZ));
						
						if (Math.abs(dblLength) > physicsHandle.dblMaxvel[0]) {
							dblVelocityX *= physicsHandle.dblMaxvel[0] / dblLength;
							dblVelocityY *= physicsHandle.dblMaxvel[0] / dblLength;
							dblVelocityZ *= physicsHandle.dblMaxvel[0] / dblLength;
							
						} else if (Math.abs(dblLength) < 0.001) {
							dblVelocityX = 0.0;
							dblVelocityY = 0.0;
							dblVelocityZ = 0.0;
							
						}
					}
					
				} else if (physicsHandle.dblMaxvel.length === 3) {
					{
						if (Math.abs(dblVelocityX) > physicsHandle.dblMaxvel[0]) {
							dblVelocityX = (dblVelocityX > 0.0 ? 1.0 : -1.0) * physicsHandle.dblMaxvel[0];
							
						} else if (Math.abs(dblVelocityX) < 0.001) {
							dblVelocityX = 0.0;
							
						}
					}
					
					{
						if (Math.abs(dblVelocityY) > physicsHandle.dblMaxvel[1]) {
							dblVelocityY = (dblVelocityY > 0.0 ? 1.0 : -1.0) * physicsHandle.dblMaxvel[1];
							
						} else if (Math.abs(dblVelocityY) < 0.001) {
							dblVelocityY = 0.0;
							
						}
					}
					
					{
						if (Math.abs(dblVelocityZ) > physicsHandle.dblMaxvel[2]) {
							dblVelocityZ = (dblVelocityZ > 0.0 ? 1.0 : -1.0) * physicsHandle.dblMaxvel[2];
							
						} else if (Math.abs(dblVelocityZ) < 0.001) {
							dblVelocityZ = 0.0;
							
						}
					}
	
				}
			}
			
			physicsHandle.dblPosition[0] = physicsHandle.dblVerlet[0] + dblVelocityX;
			physicsHandle.dblPosition[1] = physicsHandle.dblVerlet[1] + dblVelocityY;
			physicsHandle.dblPosition[2] = physicsHandle.dblVerlet[2] + dblVelocityZ;
		}
	},
	
	updateOverwrite: function(physicsHandle, physicsOverwrite) {
		{
			var dblPositionX = 0.5 * (physicsHandle.dblPosition[0] + physicsOverwrite.dblPosition[0]);
			var dblPositionY = 0.5 * (physicsHandle.dblPosition[1] + physicsOverwrite.dblPosition[1]);
			var dblPositionZ = 0.5 * (physicsHandle.dblPosition[2] + physicsOverwrite.dblPosition[2]);
			
			var dblVerletX = dblPositionX - (physicsHandle.dblPosition[0] - physicsHandle.dblVerlet[0]);
			var dblVerletY = dblPositionY - (physicsHandle.dblPosition[1] - physicsHandle.dblVerlet[1]);
			var dblVerletZ = dblPositionZ - (physicsHandle.dblPosition[2] - physicsHandle.dblVerlet[2]);
			
			physicsHandle.dblPositionX = dblPositionX;
			physicsHandle.dblPositionY = dblPositionY;
			physicsHandle.dblPositionZ = dblPositionZ;
			
			physicsHandle.dblVerletX = dblVerletX;
			physicsHandle.dblVerletY = dblVerletY;
			physicsHandle.dblVerletZ = dblVerletZ;
		}
	},
	
	updateVoxelcol: function(physicsHandle) {
		{
			physicsHandle.boolCollisionTop = false;
			
			physicsHandle.boolCollisionSide = false;
			
			physicsHandle.boolCollisionBottom = false;
		}
		
		{
			for (var intFor1 = 1; intFor1 > -2; intFor1 -= 1) {
				for (var intFor2 = 1; intFor2 > -2; intFor2 -= 1) {
					for (var intFor3 = 1; intFor3 > -2; intFor3 -= 1) {
						var intX = Math.floor(physicsHandle.dblPosition[0]) + intFor1;
						var intY = Math.floor(physicsHandle.dblPosition[1]) + intFor2;
						var intZ = Math.floor(physicsHandle.dblPosition[2]) + intFor3;
						
						if (Physics.functionVoxelcol(intX, intY, intZ) === false) {
							continue;
						}
						
						{
							var dblVoxelX = intX + 0.5;
							var dblVoxelY = intY + 0.5;
							var dblVoxelZ = intZ + 0.5;
							
							var dblIntersectX = 0.0;
							var dblIntersectY = 0.0;
							var dblIntersectZ = 0.0;
							
							{
								dblIntersectX = Math.abs(physicsHandle.dblPosition[0] - dblVoxelX) - (0.5 * physicsHandle.dblSize[0]) - (0.5 * 1.0);
								dblIntersectY = Math.abs(physicsHandle.dblPosition[1] - dblVoxelY) - (0.5 * physicsHandle.dblSize[1]) - (0.5 * 1.0);
								dblIntersectZ = Math.abs(physicsHandle.dblPosition[2] - dblVoxelZ) - (0.5 * physicsHandle.dblSize[2]) - (0.5 * 1.0);
								
								if (dblIntersectX >= 0.0) {
									continue;
		
								} else if (dblIntersectY >= 0.0) {
									continue;
		
								} else if (dblIntersectZ >= 0.0) {
									continue;
		
								}
							}
							
							if (Math.max(dblIntersectX, dblIntersectY, dblIntersectZ) === dblIntersectX) {
								if ((physicsHandle.dblPosition[0] - dblVoxelX) > 0.0) {
									physicsHandle.dblPosition[0] -= dblIntersectX;
									
									physicsHandle.boolCollisionSide = true;
									
								} else if ((physicsHandle.dblPosition[0] - dblVoxelX) < 0.0) {
									physicsHandle.dblPosition[0] += dblIntersectX;
									
									physicsHandle.boolCollisionSide = true;
									
								}
		
							} else if (Math.max(dblIntersectX, dblIntersectY, dblIntersectZ) === dblIntersectY) {
								if ((physicsHandle.dblPosition[1] - dblVoxelY) > 0.0) {
									physicsHandle.dblPosition[1] -= dblIntersectY;
									
									physicsHandle.boolCollisionBottom = true;
									
								} else if ((physicsHandle.dblPosition[1] - dblVoxelY) < 0.0) {
									physicsHandle.dblPosition[1] += dblIntersectY;
									
									physicsHandle.boolCollisionTop = true;
									
								}
		
							} else if (Math.max(dblIntersectX, dblIntersectY, dblIntersectZ) === dblIntersectZ) {
								if ((physicsHandle.dblPosition[2] - dblVoxelZ) > 0.0) {
									physicsHandle.dblPosition[2] -= dblIntersectZ;
									
									physicsHandle.boolCollisionSide = true;
									
								} else if ((physicsHandle.dblPosition[2] - dblVoxelZ) < 0.0) {
									physicsHandle.dblPosition[2] += dblIntersectZ;
									
									physicsHandle.boolCollisionSide = true;
									
								}
		
							}
						}
					}
				}
			}
		}
	},
	
	updateObjectcol: function(physicsHandle, physicsObjectcol) {
		var boolObjectcol = true;
		
		{
			var dblIntersectX = Math.abs(physicsHandle.dblPosition[0] - physicsObjectcol.dblPosition[0]) - (0.5 * physicsHandle.dblSize[0]) - (0.5 * physicsObjectcol.dblSize[0]);
			var dblIntersectY = Math.abs(physicsHandle.dblPosition[1] - physicsObjectcol.dblPosition[1]) - (0.5 * physicsHandle.dblSize[1]) - (0.5 * physicsObjectcol.dblSize[1]);
			var dblIntersectZ = Math.abs(physicsHandle.dblPosition[2] - physicsObjectcol.dblPosition[2]) - (0.5 * physicsHandle.dblSize[2]) - (0.5 * physicsObjectcol.dblSize[2]);

			if (dblIntersectX >= 0.0) {
				boolObjectcol = false;

			} else if (dblIntersectY >= 0.0) {
				boolObjectcol = false;

			} else if (dblIntersectZ >= 0.0) {
				boolObjectcol = false;

			}
		}
		
		return boolObjectcol;
	},
	
	updateRaycol: function(physicsHandle, physicsRaycol) {
		var boolRaycol = false;
		
		{
			var dblSlabMin = Number.MIN_VALUE;
			var dblSlabMax = Number.MAX_VALUE;
			
			for (var intFor1 = 0; intFor1 < 3; intFor1 += 1) {
				if (physicsHandle.dblAcceleration[intFor1] === 0.0) {
					continue;
				}
				
				{
					var dblBoxMin = physicsRaycol.dblPosition[intFor1] - (0.5 * physicsRaycol.dblSize[intFor1]);
					var dblBoxMax = physicsRaycol.dblPosition[intFor1] + (0.5 * physicsRaycol.dblSize[intFor1]);
					
					var dblCandidateMin = (dblBoxMin - physicsHandle.dblPosition[intFor1]) / physicsHandle.dblAcceleration[intFor1];
					var dblCandidateMax = (dblBoxMax - physicsHandle.dblPosition[intFor1]) / physicsHandle.dblAcceleration[intFor1];
					
					dblSlabMin = Math.max(dblSlabMin, Math.min(dblCandidateMin, dblCandidateMax));
					dblSlabMax = Math.min(dblSlabMax, Math.max(dblCandidateMin, dblCandidateMax));
				}
			}
			
			boolRaycol = dblSlabMax >= Math.max(0.0, dblSlabMin);
		}

		return boolRaycol;
	}
};