import { MapPin, Navigation, ExternalLink, Compass, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function GoogleMapsSection() {
  const address = "Jl. Puri Hidayah No. 50, RT.04/RW.04, Jatiluhur, Kec. Jatiasih, Kota Bekasi, Jawa Barat 17425";
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Jl. Puri Hidayah No. 50 Jatiluhur Jatiasih Kota Bekasi Ma'had Baitusunnah")}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent("Jl. Puri Hidayah No. 50, RT.04/RW.04, Jatiluhur, Kec. Jatiasih, Kota Bekasi, Jawa Barat")}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="bg-white rounded-3xl border border-coffee-200/90 shadow-lg p-6 sm:p-8 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-coffee-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              Lokasi & Petunjuk Arah
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-burgundy-950 tracking-tight">
              Peta Lokasi Ma'had Baitusunnah Indonesia
            </h3>
            <p className="text-xs sm:text-sm text-coffee-700 mt-1 max-w-2xl">
              Kunjungi langsung kampus asrama putri kami untuk pelaksanaan One Day Service atau konsultasi langsung bersama panitia PSB.
            </p>
          </div>

          <a
            href={googleMapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all transform active:scale-95 shrink-0"
          >
            <Navigation className="w-4 h-4" />
            <span>Buka di Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Content: Interactive Map & Address Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-stretch">
          
          {/* Map Embed (Clickable / Interactive) */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-coffee-200 shadow-xs relative min-h-[340px] bg-coffee-100">
            <iframe
              title="Lokasi Ma'had Baitusunnah Indonesia di Google Maps"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '340px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[340px] rounded-2xl"
            />
            {/* Quick Open Overlay Button on mobile/tablet */}
            <div className="absolute bottom-3 right-3 z-10">
              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-emerald-900 text-xs font-bold rounded-lg shadow-md border border-emerald-200 transition-colors backdrop-blur-xs"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                <span>Petunjuk Arah Rute</span>
              </a>
            </div>
          </div>

          {/* Location info card */}
          <div className="lg:col-span-4 bg-coffee-50/60 rounded-2xl p-5 sm:p-6 border border-coffee-200/80 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h4 className="font-bold text-burgundy-950 text-base flex items-center gap-2">
                <MapPin className="w-5 h-5 text-burgundy-800 shrink-0" />
                <span>Alamat Lengkap</span>
              </h4>

              <p className="text-xs sm:text-sm text-coffee-800 leading-relaxed font-medium">
                {address}
              </p>

              <div className="p-3 bg-white rounded-xl border border-coffee-200/80 space-y-2 text-xs text-coffee-700">
                <div className="flex items-center justify-between pb-1.5 border-b border-coffee-100">
                  <span className="font-semibold text-coffee-900">Jadwal Kunjungan:</span>
                  <span className="text-emerald-700 font-bold">Senin – Ahad</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-coffee-100">
                  <span className="font-semibold text-coffee-900">Jam Layanan PSB:</span>
                  <span className="text-coffee-800">08.00 – 16.00 WIB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-coffee-900">Konfirmasi Hadir:</span>
                  <span className="text-emerald-700 font-bold">WhatsApp Panitia</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-coffee-200">
              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigasi / Petunjuk Arah Langsung</span>
              </a>

              <a
                href="https://wa.me/6282247044181?text=Assalamu%27alaikum%20Admin%20PSB%20Ma%27had%20Baitusunnah%20Indonesia,%20saya%20ingin%20konfirmasi%20jadwal%20kunjungan%20ke%20Ma%27had"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-white hover:bg-coffee-100 text-coffee-900 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-coffee-200"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <span>Konfirmasi Kunjungan via WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
