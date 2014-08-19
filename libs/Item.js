var Item = {
	itemHandle: {},
	
	meshFlagRed: null,
	meshFlagBlue: null,
	
	meshArrow: [],
	
	init: function() {
		{
			Item.itemHandle = {};
		}

		if (typeof Voxel === 'undefined') {
			return;
		}
		
		{
			Item.meshFlagRed = Voxel.itemCreate('itemFlagRed', 0.04);
			
			Item.meshFlagBlue = Voxel.itemCreate('itemFlagBlue', 0.04);
		}
		
		{
			for (var intFor1 = 0; intFor1 < 32; intFor1 += 1) {
				{
					var meshHandle = Voxel.itemCreate('itemArrow', 0.04);
					
					Item.meshArrow.push(meshHandle);
				}
			}
		}
	},
	
	dispel: function() {
		{
			Item.itemHandle = {};
		}

		if (typeof Voxel === 'undefined') {
			return;
		}
		
		{
			Item.meshFlagRed = null;
			
			Item.meshFlagBlue = null;
		}
		
		{
			Item.meshArrow = [];
		}
	},
	
	initFlags: function() {
		{
			var strIdent = 'itemFlag - Red';
			var dblPosition = [ 0.0, 0.0, 0.0 ];
			var dblVerlet = [ 0.0, 0.0, 0.0 ];
			
			{
				var intFlagRed = Map.intFlagRed[Math.floor(Math.random() * Map.intFlagRed.length)];
				
				dblPosition[0] = intFlagRed[0] + 0.5;
				dblPosition[1] = intFlagRed[1] + 1.5;
				dblPosition[2] = intFlagRed[2] + 0.5;

				dblVerlet[0] = dblPosition[0];
				dblVerlet[1] = dblPosition[1];
				dblVerlet[2] = dblPosition[2];
			}
			
			Item.itemHandle[strIdent] = {
				'strIdent': strIdent,
				'strPlayer': '',
				'dblPosition': dblPosition,
				'dblVerlet': dblVerlet,
				'dblAcceleration': [ 0.0, 0.0, 0.0 ],
				'dblRotation': [ 0.0, 0.0, 0.0 ]
			};
		}
		
		{
			var strIdent = 'itemFlag - Blue';
			var dblPosition = [ 0.0, 0.0, 0.0 ];
			var dblVerlet = [ 0.0, 0.0, 0.0 ];
			
			{
				var intFlagBlue = Map.intFlagBlue[Math.floor(Math.random() * Map.intFlagBlue.length)];
				
				dblPosition[0] = intFlagBlue[0] + 0.5;
				dblPosition[1] = intFlagBlue[1] + 1.5;
				dblPosition[2] = intFlagBlue[2] + 0.5;

				dblVerlet[0] = dblPosition[0];
				dblVerlet[1] = dblPosition[1];
				dblVerlet[2] = dblPosition[2];
			}
			
			Item.itemHandle[strIdent] = {
				'strIdent': strIdent,
				'strPlayer': '',
				'dblPosition': dblPosition,
				'dblVerlet': dblVerlet,
				'dblAcceleration': [ 0.0, 0.0, 0.0 ],
				'dblRotation': [ 0.0, 0.0, 0.0 ]
			};
		}
	},
	
	update: function() {
		{
			for (var strIdent in Item.itemHandle) {
				var itemHandle = Item.itemHandle[strIdent];
				
				{
					if (itemHandle.strIdent.indexOf('itemFlag') === 0) {
						{
							itemHandle.dblSize = Constants.dblFlagSize;
							itemHandle.dblGravity = Constants.dblFlagGravity;
							itemHandle.dblMaxvel = Constants.dblFlagMaxvel;
							itemHandle.dblFriction = Constants.dblFlagFriction;
	
							Physics.update(itemHandle);
							Physics.updateVoxelcol(itemHandle);
						}
						
						{
							itemHandle.dblRotation[1] = (itemHandle.dblRotation[1] + Constants.dblFlagRotate) % (2.0 * Math.PI);
						}
						
					} else if (itemHandle.strIdent.indexOf('itemArrow') === 0) {
						{
							itemHandle.dblSize = Constants.dblArrowSize;
							itemHandle.dblGravity = Constants.dblArrowGravity;
							itemHandle.dblMaxvel = Constants.dblArrowMaxvel;
							itemHandle.dblFriction = Constants.dblArrowFriction;
							
							Physics.update(itemHandle);
							Physics.updateVoxelcol(itemHandle);
						}
						
						{
							var dblVelocityX = itemHandle.dblPosition[0] - itemHandle.dblVerlet[0];
							var dblVelocityY = itemHandle.dblPosition[1] - itemHandle.dblVerlet[1];
							var dblVelocityZ = itemHandle.dblPosition[2] - itemHandle.dblVerlet[2];
	
							itemHandle.dblRotation[0] = 0.0;
							itemHandle.dblRotation[1] = Math.atan2(dblVelocityX, dblVelocityZ) + (1.0 * Math.PI);
							itemHandle.dblRotation[2] = Math.atan2(dblVelocityY, Math.sqrt((dblVelocityX * dblVelocityX) + (dblVelocityZ * dblVelocityZ)));
						}
						
						{
							if (itemHandle.boolCollisionTop === true) {
								delete Item.itemHandle[itemHandle.strIdent];
								
							} else if (itemHandle.boolCollisionSide === true) {
								delete Item.itemHandle[itemHandle.strIdent];
								
							} else if (itemHandle.boolCollisionBottom === true) {
								delete Item.itemHandle[itemHandle.strIdent];
								
							}
						}
						
						{
							itemHandle.dblSize = Constants.dblArrowSize;
							
							Physics.updateObjectcol(itemHandle, function() {
								var playerHandle = null;
								
								{
									if (arguments.callee.strIdent === undefined) {
										arguments.callee.strIdent = Object.keys(Player.playerHandle);
									}
								}
								
								{
									do {
										playerHandle = Player.playerHandle[arguments.callee.strIdent.pop()];
										
										if (playerHandle === undefined) {
											return null;
										}
										
										if (playerHandle.strTeam === 'teamLogin') {
											continue;
											
										} else if (playerHandle.strIdent === itemHandle.strPlayer) {
											continue;
											
										}
										
										break;
									} while (true);
								}
								
								{
									playerHandle.dblSize = Constants.dblPlayerHitbox;
								}
								
								return playerHandle;
							}, function(physicsHandle) {
								{
									// TODO: Gameserver.functionPlayerHit(physicsHandle, itemHandle);
								}
								
								{
									delete Item.itemHandle[itemHandle.strIdent];
								}
							});
						}
						
					}
				}
			}
		}

		if (typeof Voxel === 'undefined') {
			return;
		}
		
		{
			for (var intFor1 = 0; intFor1 < Item.meshArrow.length; intFor1 += 1) {
				var meshHandle = Item.meshArrow[intFor1];

				if (meshHandle.parent === undefined) {
					continue;
				}
				
				{
					Voxel.voxelengineHandle.scene.remove(meshHandle);
				}
			}
		}
		
		{
			for (var strIdent in Item.itemHandle) {
				var itemHandle = Item.itemHandle[strIdent];
				
				{
					var meshHandle = null;
					
					{
						if (itemHandle.strIdent === 'itemFlag - Red') {
							meshHandle = Item.meshFlagRed;
							
						} else if (itemHandle.strIdent === 'itemFlag - Blue') {
							meshHandle = Item.meshFlagBlue;
							
						} else if (itemHandle.strIdent.indexOf('itemArrow') === 0) {
							for (var intFor1 = 0; intFor1 < Item.meshArrow.length; intFor1 += 1) {
								if (Item.meshArrow[intFor1].parent !== undefined) {
									continue;
								}
								
								{
									meshHandle = Item.meshArrow[intFor1];
								}
								
								{
									break;
								}
							}
							
						}
					}
					
					{
						if (meshHandle.parent === undefined) {
							Voxel.voxelengineHandle.scene.add(meshHandle);
						}
					}
					
					{
						if (itemHandle.strIdent.indexOf('itemFlag') === 0) {
							meshHandle.position.x = itemHandle.dblPosition[0];
							meshHandle.position.y = itemHandle.dblPosition[1];
							meshHandle.position.z = itemHandle.dblPosition[2];
							
							meshHandle.rotation.x = itemHandle.dblRotation[0];
							meshHandle.rotation.y = itemHandle.dblRotation[1];
							meshHandle.rotation.z = itemHandle.dblRotation[2];

						} else if (itemHandle.strIdent.indexOf('itemArrow') === 0) {
							meshHandle.position.x = itemHandle.dblPosition[0];
							meshHandle.position.y = itemHandle.dblPosition[1];
							meshHandle.position.z = itemHandle.dblPosition[2];
							
							meshHandle.rotation.x = itemHandle.dblRotation[0];
							meshHandle.rotation.y = itemHandle.dblRotation[1] + (0.5 * Math.PI);
							meshHandle.rotation.z = itemHandle.dblRotation[2] + (1.25 * Math.PI);
							
						}
					}
				}
			}
		}
	}
};