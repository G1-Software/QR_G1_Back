require('dotenv').config();
const supabase = require('../supabase');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendMail(to, subject, text) {
  const html = text.replace(/\n/g, '<br>');

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  });
}

async function handleRequestEmailFlow(requestData) {
  try {
    const { qr_id, area, subarea, description, requester_full_name, requester_email } = requestData;

    await sendMail(
      requester_email,
      'Solicitud recibida - Hospital UC Christus',
      `Hemos recibido tu solicitud correctamente.

• Nombre: ${requester_full_name}
• Correo: ${requester_email}
• Área: ${area}
• Subárea: ${subarea || 'No aplica'}
• Descripción: ${description}

Gracias por contactarnos,
Hospital UC Christus`
    );

    const { data: qrInfo } = await supabase.from('qr').select('institution, building, floor, service, room, bed').eq('id', qr_id).single();
    const { data: boss } = await supabase.from('staff').select('email').eq('area', area).eq('position', 'Jefe').single();
    const { data: supervisors } = await supabase.from('staff').select('email').eq('area', area).eq('position', 'Supervisor');
    const { data: workers } = await supabase.from('staff').select('email').eq('area', area).eq('position', 'Trabajador');

    const staffBlock = `
• Ubicación del paciente:
   - Institución: ${qrInfo?.institution}
   - Edificio: ${qrInfo?.building}
   - Piso: ${qrInfo?.floor}
   - Servicio: ${qrInfo?.service}
   - Habitación: ${qrInfo?.room}
   - Cama: ${qrInfo?.bed}
`.trim();

    const bossSupervisorEmails = [
      ...(boss?.email ? [boss.email] : []),
      ...(supervisors?.map(s => s.email) || []),
    ];

    if (bossSupervisorEmails.length > 0) {
      await sendMail(
        bossSupervisorEmails,
        `Nueva solicitud - Área ${area}`,
        `Nueva solicitud registrada.

• Nombre del solicitante: ${requester_full_name}
• Correo: ${requester_email}
• Área: ${area}
• Subárea: ${subarea || 'No aplica'}
• Descripción: ${description}

${staffBlock}

Por favor, revisar el sistema y gestionar según corresponda.`
      );
    }

    if (workers && workers.length > 0) {
      const workerEmails = workers.map(w => w.email);

      await sendMail(
        workerEmails,
        `Nueva solicitud - Área ${area}`,
        `Se ha registrado una nueva solicitud.

• Nombre del solicitante: ${requester_full_name}
• Área: ${area}
• Subárea: ${subarea || 'No aplica'}
• Descripción: ${description}

${staffBlock}

Favor apoyar según corresponda.`
      );
    }
  } catch (err) {
    console.error('Error enviando correos:', err);
  }
}

module.exports = { handleRequestEmailFlow };
