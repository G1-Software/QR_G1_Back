require('dotenv').config();
const nodemailer = require('nodemailer');
const supabase = require('../supabase');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

async function handleRequestEmailFlow(requestData) {
  try {
    const { qr_id, area, subarea, description, requester_full_name, requester_email } = requestData;

    await transporter.sendMail({
      from: `Hospital UC Christus <${process.env.GMAIL_USER}>`,
      to: requester_email,
      subject: 'Solicitud recibida - Hospital UC Christus',
      text: `Hemos recibido tu solicitud correctamente.

• Nombre: ${requester_full_name}
• Correo: ${requester_email}
• Área: ${area}
• Subárea: ${subarea || 'No aplica'}
• Descripción: ${description}

Gracias por contactarnos,
Hospital UC Christus`
    });

    const { data: qrInfo } = await supabase.from('qr').select('institution, building, floor, service, room, bed').eq('id', qr_id).single();
    const { data: boss } = await supabase.from('staff').select('email').eq('area', area).eq('position', 'Jefe').single();
    const { data: supervisors } = await supabase.from('staff').select('email').eq('area', area).eq('position', 'Supervisor');
    const { data: workers } = await supabase.from('staff').select('email').eq('area', area).eq('position', 'Trabajador');

    const bossAndSupervisorEmails = [
      ...(boss?.email ? [boss.email] : []),
      ...(supervisors?.map(s => s.email) || [])
    ];

    if (bossAndSupervisorEmails.length > 0) {
      await transporter.sendMail({
        from: `Hospital UC Christus <${process.env.GMAIL_USER}>`,
        to: bossAndSupervisorEmails.join(','),
        subject: `Nueva solicitud - Área ${area}`,
        text: `Nueva solicitud registrada.

• Nombre del solicitante: ${requester_full_name}
• Correo del solicitante: ${requester_email}
• Área: ${area}
• Subárea: ${subarea || 'No aplica'}
• Descripción: ${description}

• Ubicación del paciente:
   - Institución: ${qrInfo?.institution}
   - Edificio: ${qrInfo?.building}
   - Piso: ${qrInfo?.floor}
   - Servicio: ${qrInfo?.service}
   - Habitación: ${qrInfo?.room}
   - Cama: ${qrInfo?.bed}

Por favor, revisar el sistema y gestionar según corresponda.`
      });
    }

    if (workers && workers.length > 0) {
      const workerEmails = workers.map(w => w.email);

      await transporter.sendMail({
        from: `Hospital UC Christus <${process.env.GMAIL_USER}>`,
        to: workerEmails.join(','),
        subject: `Nueva solicitud - Área ${area}`,
        text: `Se ha registrado una nueva solicitud.

• Nombre del solicitante: ${requester_full_name}
• Área: ${area}
• Subárea: ${subarea || 'No aplica'}
• Descripción: ${description}

• Ubicación del paciente:
   - Institución: ${qrInfo?.institution}
   - Edificio: ${qrInfo?.building}
   - Piso: ${qrInfo?.floor}
   - Servicio: ${qrInfo?.service}
   - Habitación: ${qrInfo?.room}
   - Cama: ${qrInfo?.bed}

Favor apoyar según corresponda.`
      });
    }

  } catch (err) {
    console.error('❌ Error enviando correos:', err);
  }
}

module.exports = { handleRequestEmailFlow };
