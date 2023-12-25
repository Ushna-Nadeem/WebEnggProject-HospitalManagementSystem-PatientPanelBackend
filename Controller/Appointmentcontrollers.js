const Appointment = require('../Model/Appointmentmodels');

// Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorName,
      specialty,
      preferredDate,
      preferredTime,
      appointmentType,
      reason,
      hasInsurance,
      emergencyContact,
    } = req.body;

    const appointment = new Appointment({
      patientId,
      doctorName,
      specialty,
      preferredDate,
      preferredTime,
      appointmentType,
      reason,
      hasInsurance,
      emergencyContact,
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View appointments
exports.viewAppointments = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const query = {
      patientId,
      status: 'Scheduled', // Only retrieve scheduled appointments
    };

    const appointments = await Appointment.find(query);

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No upcoming scheduled appointments found for the specified patient.' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error retrieving appointments:', error);
    res.status(500).json({ message: error.message });
  }
};  

exports.viewAppointmentsHistory = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    const query = {
      patientId,
      status: ['Completed', 'Cancelled']
    };

    const appointments = await Appointment.find(query);

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointment history found for the specified patient.' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error retrieving appointments:', error);
    res.status(500).json({ message: error.message });
  }
};  

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId;
  
      const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { status: 'Cancelled' },
        { new: true }
      );
  
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      res.status(200).json(appointment);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      res.status(500).json({ message: error.message });
    }
  };  
