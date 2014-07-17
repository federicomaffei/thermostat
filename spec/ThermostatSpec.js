describe("Thermostat", function() {

  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  })

  it("is initially at 20 degrees", function(){
    expect(thermostat.temperature).toEqual(20);
  })

  it("has PSM in by default", function(){
    expect(thermostat.powerSavingMode).toBe(true);
  })

  describe('Maximum temperature', function(){
    it('is 25 degrees with PSM on', function(){
      expect(thermostat.maximumTemperature()).toEqual(25);
    })

    it('is 25 degrees with PSM on', function(){
      thermostat.powerSavingMode = false;
      expect(thermostat.maximumTemperature()).toEqual(32);
    })
  })

  describe('Minimum temperature', function(){
    it('is 10 degrees', function(){
      expect(thermostat.minimumTemperature()).toEqual(10);
    })
  })

  describe('warmer', function (){

    describe('PSM on', function(){
      it('increases the temperature if < 25°', function(){
        thermostat.warmer();
        expect(thermostat.temperature).toEqual(21);
      })
      it('does not increase the temperature if >= 25°', function(){
        thermostat.temperature = 25;
        thermostat.warmer();
        expect(thermostat.temperature).toEqual(25);
      })
    })

    describe('PSM off', function(){
      it('increases the temperature if < 32°', function(){
        thermostat.powerSavingMode = false;
        thermostat.warmer();
        expect(thermostat.temperature).toEqual(21);
      })
      it('does not increase the temperature if >= 25°', function(){
        thermostat.powerSavingMode = false;
        thermostat.temperature = 25;
        thermostat.warmer();
        expect(thermostat.temperature).toEqual(26);
      })
    })
  })

  describe('cooler', function (){
    it('decreases the temperature if > 10°', function(){
      thermostat.cooler();
      expect(thermostat.temperature).toEqual(19);
    })
    it('does not increase the temperature if <= 10°', function(){
      thermostat.temperature = 10;
      thermostat.cooler();
      expect(thermostat.temperature).toEqual(10);
    })
  })

  describe('reset button', function (){
    it('puts the temperature to 20 no matter what', function(){
      thermostat.temperature = 27
      thermostat.reset_button();
      expect(thermostat.temperature).toEqual(20);
    })
  })

  describe('energy usage', function (){
    it('is high if the the temperature is >= 25°', function(){
      thermostat.temperature = 27
      expect(thermostat.energyUsage()).toEqual('high');
    })
    it('is medium if the temperature is < 25° && >= 18', function(){
      thermostat.temperature = 22
      expect(thermostat.energyUsage()).toEqual('medium');
    })
    it('is low if the the temperature is < 18°', function(){
      thermostat.temperature = 16
      expect(thermostat.energyUsage()).toEqual('low');
    })
  })

});