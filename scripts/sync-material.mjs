import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.migration' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const materiales = [
  { id: 6, pdf_url: 'https://drive.google.com/file/d/1a-jls46yHkKCVEgEH0sblBFHHrJw9wc1/view?usp=drivesdk' },
  { id: 7, pdf_url: 'https://drive.google.com/file/d/1d_O0MmWmHnsqFwJFbFfvIk45nJezxKVn/view?usp=drivesdk' },
  { id: 8, pdf_url: 'https://drive.google.com/file/d/1XX2XnyTGfpn4Mz4GH38u3wDKbYZUdzjA/view?usp=drivesdk' },
  { id: 9, pdf_url: 'https://drive.google.com/file/d/1wdDvBFwDuc7CGwt4CSHnXALNu2vz9BUJ/view?usp=drivesdk' },
  { id: 10, pdf_url: 'https://drive.google.com/file/d/1OQrnPT0iE0rFB6muCXkdv2T0REh9TVid/view?usp=drivesdk' },
  { id: 11, pdf_url: 'https://drive.google.com/file/d/1C6NCoGJUWwkiecPRMIVnO8ahA0T87_H3/view?usp=drivesdk' },
  { id: 12, pdf_url: 'https://drive.google.com/file/d/1REGx7KKOh-J_tNILdLly0G4QbjkDY1mT/view?usp=drivesdk' },
  { id: 13, pdf_url: 'https://drive.google.com/file/d/1rsAmEcAi2PFyMeOomKCMEgtBMBRuFC7j/view?usp=drivesdk' },
  { id: 14, pdf_url: 'https://drive.google.com/file/d/1wVnJKo1Lag1BWWgTQ0x44haAzIRLicbc/view?usp=drivesdk' },
  { id: 15, pdf_url: 'https://drive.google.com/file/d/1Pp8ySxT6iK6lg7f-sP-Hlrf_qOkPXBJb/view?usp=drivesdk' },
  { id: 16, pdf_url: 'https://drive.google.com/file/d/17AvB3DVDQR8BzSEUjnTQCS6Np3s11U_o/view?usp=drivesdk' },
  { id: 17, pdf_url: 'https://drive.google.com/file/d/13SVBRrpcd48aKdfvdtl7esVTZOO8qAR9/view?usp=drivesdk' },
  { id: 18, pdf_url: 'https://drive.google.com/file/d/10abilbErjQDoSbWP2IU9FX6BJlct0cT6/view?usp=drivesdk' },
];

for (const m of materiales) {
  const { error } = await supabase
    .from('material_educativo')
    .update({ pdf_url: m.pdf_url })
    .eq('id', m.id);

  if (error) console.log(`❌ Material ${m.id}: ${error.message}`);
  else console.log(`✅ Material ${m.id} → Drive URL actualizada`);
}

console.log('\n🎉 Material sincronizado');