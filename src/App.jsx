import React, { useMemo, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import symptomItch from './assets/diomiy qichishish.webp';
import symptomInflammation from "./assets/yoshmalar va yallig'lanish.webp";
import symptomDryness from './assets/teri qurishi va yorilishi .webp';
import symptomCrust from './assets/tirsak va tizzalarda qalin qobiq.webp';
import symptomScalp from './assets/bosh terishida kepaklanish va qichishish.webp';
import symptomRash from './assets/badanda bosh qismida toshmalra.webp';
import symptomSleep from './assets/uyqisizik va stress.webp';
import symptomLook from './assets/atrofdagilarni noqulay nigohlari.webp';
import psorinormProduct from './assets/psirinorm.png';
import natureBg from './assets/tabiat.png';
import otziv1 from './assets/1-otziv.mp4';
import otziv2 from './assets/2-otziv.mp4';
import otziv3 from './assets/3-otziv.mov';
import otziv4 from './assets/4-otziv.MP4';

const symptoms = [
  { title: 'Qichishish', desc: 'Doimiy qichishish va noqulaylik hissi.', image: symptomItch },
  { title: 'Yallig‘lanish', desc: 'Teri qizarishi va yallig‘lanish belgisi.', image: symptomInflammation },
  { title: 'Quruqlik', desc: 'Teri quruqlashib, taranglik seziladi.', image: symptomDryness },
  { title: 'Qalin qobiq', desc: 'Qalin qobiq va qipiqlanish.', image: symptomCrust },
  { title: 'Bosh terisi', desc: 'Kepaklanish va qichishish.', image: symptomScalp },
  { title: 'Toshmalar', desc: 'Badanda toshmalar paydo bo‘lishi.', image: symptomRash },
  { title: 'Uyqusizlik', desc: 'Uyqu buzilishi va stress.', image: symptomSleep },
  { title: 'Noqulaylik', desc: 'Atrofdagilarning noqulay nigohlari.', image: symptomLook }
];


const testimonials = [
  {
    name: 'Dilorom A.',
    location: 'Toshkent',
    text: 'Teri qizarishi kamaydi, qichishish sezilmay qoldi. 10 kunda farqni ko‘rdim.',
    video: otziv1
  },
  {
    name: 'Sardor K.',
    location: 'Samarqand',
    text: 'Doimiy quruqlik yo‘qoldi. Parvarish oson bo‘ldi.',
    video: otziv2
  },
  {
    name: 'Nilufar S.',
    location: 'Namangan',
    text: 'Teri yumshadi, qichishish kamaydi. Natija tez sezildi.',
    video: otziv3
  },
  {
    name: 'Malika R.',
    location: 'Buxoro',
    text: 'O‘zimga ishonchim qaytdi. Teri silliqlashdi.',
    video: otziv4
  }
];

export default function App() {
  const [heroName, setHeroName] = useState('');
  const [heroPhone, setHeroPhone] = useState('');
  const [heroPhoneKey, setHeroPhoneKey] = useState(0);
  const [heroStatus, setHeroStatus] = useState('idle');
  const [heroMessage, setHeroMessage] = useState('');

  const [ctaName, setCtaName] = useState('');
  const [ctaPhone, setCtaPhone] = useState('');
  const [ctaPhoneKey, setCtaPhoneKey] = useState(0);
  const [ctaStatus, setCtaStatus] = useState('idle');
  const [ctaMessage, setCtaMessage] = useState('');

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactPhoneKey, setContactPhoneKey] = useState(0);
  const [contactStatus, setContactStatus] = useState('idle');
  const [contactMessage, setContactMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [modalName, setModalName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalPhoneKey, setModalPhoneKey] = useState(0);
  const [modalStatus, setModalStatus] = useState('idle');
  const [modalMessage, setModalMessage] = useState('');

  const [inlineName, setInlineName] = useState('');
  const [inlinePhone, setInlinePhone] = useState('');
  const [inlinePhoneKey, setInlinePhoneKey] = useState(0);
  const [inlineStatus, setInlineStatus] = useState('idle');
  const [inlineMessage, setInlineMessage] = useState('');

  const apiUrl = useMemo(() => {
    const base = import.meta.env.VITE_API_URL || '';
    return base ? base.replace(/\/$/, '') : '';
  }, []);

  const submitLead = async (fullName, phone) => {
    const res = await fetch(`${apiUrl}/api/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, phone })
    });

    if (!res.ok) {
      throw new Error('Server javobi xato');
    }
  };

  const handleSubmit = async ({ name, phone, setStatus, setMessage, clear }) => {
    setStatus('loading');
    setMessage('');

    if (!name.trim() || !phone.trim()) {
      setStatus('error');
      setMessage('Iltimos, ism-familiya va telefon raqamni kiriting.');
      return;
    }

    try {
      const formatted = phone.trim().startsWith('+') ? phone.trim() : `+${phone.trim()}`;
      await submitLead(name.trim(), formatted);
      setStatus('success');
      setMessage('Rahmat! Mutaxassis siz bilan tez orada bog‘lanadi.');
      clear();
    } catch (err) {
      setStatus('error');
      setMessage('Yuborishda xatolik. Iltimos, qayta urinib ko‘ring.');
    }
  };

  const renderHeroForm = () => (
    <form
      className="rounded-3xl bg-white p-6 shadow-2xl ring-2 ring-blue-100"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit({
          name: heroName,
          phone: heroPhone,
          setStatus: setHeroStatus,
          setMessage: setHeroMessage,
          clear: () => {
            setHeroName('');
            setHeroPhone('');
            setHeroPhoneKey((prev) => prev + 1);
          }
        });
      }}
    >
      <div className="mb-4 rounded-2xl bg-blue-50 p-4">
        <h3 className="text-lg font-semibold text-slate-900">Tezkor buyurtma</h3>
        <p className="text-sm text-slate-600">2 daqiqada forma — mutaxassis tez bog‘lanadi</p>
      </div>
      <div className="space-y-3">
        <input
          className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
          type="text"
          placeholder="Ism-familiya"
          autoComplete="name"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
        />
        <PhoneInput
          key={heroPhoneKey}
          country="uz"
          value={heroPhone}
          onChange={(value) => setHeroPhone(value)}
          placeholder="+998 00 000 00 00"
          containerClass="w-full"
          inputClass="!w-full !border-2 !border-slate-200 !rounded-2xl !pl-14 !pr-4 !py-3 !text-sm !h-auto focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-100"
          buttonClass="!border-2 !border-slate-200 !rounded-2xl !bg-white"
          dropdownClass="!text-slate-900"
          countryCodeEditable={false}
          enableSearch
          inputProps={{ inputMode: 'numeric', autoComplete: 'tel' }}
        />
      </div>
      <button
        className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
        type="submit"
        disabled={heroStatus === 'loading'}
      >
        {heroStatus === 'loading' ? 'Yuborilmoqda...' : 'Yuborish'}
      </button>
      {heroMessage && (
        <div className={`mt-3 rounded-2xl px-4 py-3 text-xs font-semibold ${heroStatus === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {heroMessage}
        </div>
      )}
    </form>
  );

  const renderCtaForm = () => (
    <form
      className="rounded-[2rem] border border-white/30 bg-white/15 p-6 text-white backdrop-blur"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit({
          name: ctaName,
          phone: ctaPhone,
          setStatus: setCtaStatus,
          setMessage: setCtaMessage,
          clear: () => {
            setCtaName('');
            setCtaPhone('');
            setCtaPhoneKey((prev) => prev + 1);
          }
        });
      }}
    >
      <h3 className="text-xl font-semibold">Buyurtma berish</h3>
      <p className="mt-1 text-sm text-blue-100">2 daqiqada to‘ldiring</p>
      <div className="mt-4 space-y-3">
        <input
          className="w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-100 focus:border-white focus:outline-none focus:ring-4 focus:ring-white/20"
          type="text"
          placeholder="Ism-familiya"
          autoComplete="name"
          value={ctaName}
          onChange={(e) => setCtaName(e.target.value)}
        />
        <PhoneInput
          key={ctaPhoneKey}
          country="uz"
          value={ctaPhone}
          onChange={(value) => setCtaPhone(value)}
          placeholder="+998 00 000 00 00"
          containerClass="w-full"
          inputClass="!w-full !rounded-2xl !bg-white/10 !text-white !border !border-white/30 !pl-14 !pr-4 !py-3 !text-sm !h-auto focus:!border-white focus:!ring-4 focus:!ring-white/20 placeholder:!text-blue-100"
          buttonClass="!rounded-2xl !border !border-white/30 !bg-white/10"
          dropdownClass="!text-slate-900"
          countryCodeEditable={false}
          enableSearch
          inputProps={{ inputMode: 'numeric', autoComplete: 'tel' }}
        />
      </div>
      <button
        className="mt-4 w-full rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-xl"
        type="submit"
        disabled={ctaStatus === 'loading'}
      >
        {ctaStatus === 'loading' ? 'Yuborilmoqda...' : 'Yuborish'}
      </button>
      {ctaMessage && (
        <div className={`mt-3 rounded-2xl px-4 py-3 text-xs font-semibold ${ctaStatus === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {ctaMessage}
        </div>
      )}
    </form>
  );

  const renderContactForm = () => (
    <form
      className="space-y-6 rounded-3xl bg-white p-10 shadow-2xl ring-2 ring-blue-100"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit({
          name: contactName,
          phone: contactPhone,
          setStatus: setContactStatus,
          setMessage: setContactMessage,
          clear: () => {
            setContactName('');
            setContactPhone('');
            setContactPhoneKey((prev) => prev + 1);
          }
        });
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Ism-familiya
          <input
            className="mt-2 w-full rounded-2xl border-2 border-slate-200 px-5 py-3 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            type="text"
            placeholder="Ismingizni kiriting"
            autoComplete="name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Telefon raqam
          <div className="mt-2">
            <PhoneInput
              key={contactPhoneKey}
              country="uz"
              value={contactPhone}
              onChange={(value) => setContactPhone(value)}
              placeholder="+998 00 000 00 00"
              containerClass="w-full"
              inputClass="!w-full !border-2 !border-slate-200 !rounded-2xl !pl-14 !pr-4 !py-3 !text-sm !h-auto focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-100"
              buttonClass="!border-2 !border-slate-200 !rounded-2xl !bg-white"
              dropdownClass="!text-slate-900"
              countryCodeEditable={false}
              enableSearch
              inputProps={{ inputMode: 'numeric', autoComplete: 'tel' }}
            />
          </div>
        </label>
      </div>
      <button
        className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition hover:shadow-2xl"
        type="submit"
        disabled={contactStatus === 'loading'}
      >
        {contactStatus === 'loading' ? 'Yuborilmoqda...' : 'Yuborish'}
      </button>
      {contactMessage && (
        <div className={`rounded-2xl px-4 py-3 text-sm font-semibold ${contactStatus === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {contactMessage}
        </div>
      )}
      <p className="text-xs text-slate-500">Yuborish orqali siz xizmat shartlariga rozilik bildirasiz.</p>
    </form>
  );

  const renderModalForm = () => (
    <form
      className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit({
          name: modalName,
          phone: modalPhone,
          setStatus: setModalStatus,
          setMessage: setModalMessage,
          clear: () => {
            setModalName('');
            setModalPhone('');
            setModalPhoneKey((prev) => prev + 1);
          }
        });
      }}
    >
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">Konsultatsiya</p>
        <h3 className="mt-3 text-2xl font-bold text-slate-900">Ma’lumotlarni yuborish</h3>
        <p className="mt-2 text-sm text-slate-600">Ma’lumotlaringiz maxfiy saqlanadi.</p>
      </div>
      <div className="space-y-4">
        <input
          className="w-full rounded-2xl border-2 border-slate-200 px-5 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
          type="text"
          placeholder="Ism-familiya"
          autoComplete="name"
          value={modalName}
          onChange={(e) => setModalName(e.target.value)}
        />
        <PhoneInput
          key={modalPhoneKey}
          country="uz"
          value={modalPhone}
          onChange={(value) => setModalPhone(value)}
          placeholder="+998 00 000 00 00"
          containerClass="w-full"
          inputClass="!w-full !border-2 !border-slate-200 !rounded-2xl !pl-14 !pr-4 !py-3 !text-sm !h-auto focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-100"
          buttonClass="!border-2 !border-slate-200 !rounded-2xl !bg-white"
          dropdownClass="!text-slate-900"
          countryCodeEditable={false}
          enableSearch
          inputProps={{ inputMode: 'numeric', autoComplete: 'tel' }}
        />
      </div>
      <button
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-xl transition hover:shadow-2xl"
        type="submit"
        disabled={modalStatus === 'loading'}
      >
        {modalStatus === 'loading' ? 'Yuborilmoqda...' : 'Yuborish'}
      </button>
      {modalMessage && (
        <div className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${modalStatus === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {modalMessage}
        </div>
      )}
      <p className="mt-3 text-center text-xs text-slate-500">Yuborish orqali siz xizmat shartlariga rozilik bildirasiz.</p>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900">
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close modal"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                setModalOpen(false);
              }
            }}
          />
          <div className="relative w-full max-w-lg">
            <button
              className="absolute right-4 top-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
              onClick={() => setModalOpen(false)}
              type="button"
            >
              Yopish
            </button>
            {renderModalForm()}
          </div>
        </div>
      )}
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-bold text-white shadow-lg">
              P
            </div>
            <div>
              <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">PSORINORM</p>
              <span className="text-sm text-slate-500">Psoriaz parvarish markazi</span>
            </div>
          </div>
          <div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <a className="transition hover:text-blue-600" href="#symptoms">Alomatlar</a>
            <a className="transition hover:text-blue-600" href="#reviews">Otzivlar</a>
            <a className="transition hover:text-blue-600" href="#product">Mahsulot</a>
            <a className="transition hover:text-blue-600" href="#contact">Aloqa</a>
          </div>
          <button
            className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            onClick={() => setModalOpen(true)}
          >
            Konsultatsiya
          </button>
        </div>
      </nav>

      <header
        id="hero"
        className="relative overflow-hidden px-6 pb-20 pt-16"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(255,255,255,0.9), rgba(239,246,255,0.85)), url(${natureBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_55%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.18),transparent_55%)]" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="space-y-6 animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-xs font-semibold text-blue-700">
              🩺 Professional parvarish
            </span>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Psoriaz alomatlarini yengillashtirish uchun{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">PSORINORM</span>
            </h1>
            <p className="text-lg text-slate-600">
              Qichishish, quruqlik va qizarishni kamaytirishga yo‘naltirilgan kompleks parvarish.
              Qisqa forma qoldiring — mutaxassis siz bilan bog‘lanadi.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-4 text-base font-semibold text-white shadow-xl transition hover:shadow-2xl"
                onClick={() => setModalOpen(true)}
              >
                Bepul konsultatsiya
              </button>
              <button
                className="rounded-full border-2 border-blue-200 bg-white px-7 py-4 text-base font-semibold text-blue-600 shadow-lg transition hover:shadow-xl"
                onClick={() => document.getElementById('product').scrollIntoView({ behavior: 'smooth' })}
              >
                Ko‘proq o‘rganish
              </button>
            </div>
            <div className="flex flex-wrap gap-8 pt-4">
              {[
                { value: '5000+', label: 'Mijozlar' },
                { value: '95%', label: 'Mamnunlik' },
                { value: '15+', label: 'Yillik tajriba' }
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-3xl font-bold text-blue-700">{item.value}</div>
                  <div className="text-sm text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-1 rounded-[3.2rem] bg-gradient-to-br from-blue-200 via-cyan-200 to-blue-100 opacity-70 blur-2xl" />
              <div className="relative rounded-[3rem] bg-white/10 p-6 shadow-2xl backdrop-blur-xl ring-1 ring-blue-100">
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-cyan-100 p-0 animate-float">
                  <img
                    className="h-full w-full object-cover"
                    src={psorinormProduct}
                    alt="Psorinorm mahsuloti"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl animate-glow">
                  <img
                    className="h-14 w-14 object-contain"
                    src={psorinormProduct}
                    alt="Psorinorm mahsuloti"
                  />
                  <span className="text-sm font-semibold text-slate-900">✓ Kafolatlangan natija</span>
                </div>
              </div>
            </div>
            {renderHeroForm()}
          </div>
        </div>
      </header>

      <section id="symptoms" className="bg-white px-6 py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Alomatlar</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Psoriazning eng ko‘p uchraydigan 8 ta alomati</h2>
            <p className="mt-4 text-slate-600">Quyidagi belgilar sizda bo‘lsa, parvarish kursi foydali bo‘lishi mumkin.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {symptoms.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-3xl bg-slate-50 shadow-soft transition hover:-translate-y-1 hover:shadow-2xl">
                <img
                  className="h-64 w-full object-cover sm:h-72 md:h-80"
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-10">
        <div className="mx-auto w-full max-w-5xl rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-blue-50 p-8 shadow-2xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Hozirroq ro‘yxatdan o‘ting va mutaxassislarimiz bilan bog‘laning!
            </h3>
          </div>
          <div className="mt-8">
            <form
              className="flex flex-col gap-4 md:flex-row md:items-center"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit({
                  name: inlineName,
                  phone: inlinePhone,
                  setStatus: setInlineStatus,
                  setMessage: setInlineMessage,
                  clear: () => {
                    setInlineName('');
                    setInlinePhone('');
                    setInlinePhoneKey((prev) => prev + 1);
                  }
                });
              }}
            >
              <input
                className="w-full rounded-full border-2 border-slate-200 bg-white px-6 py-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                type="text"
                placeholder="Ismingizni kiriting"
                value={inlineName}
                onChange={(e) => setInlineName(e.target.value)}
              />
              <div className="w-full">
                <PhoneInput
                  key={inlinePhoneKey}
                  country="uz"
                  value={inlinePhone}
                  onChange={(value) => setInlinePhone(value)}
                  placeholder="+998 00 000 00 00"
                  containerClass="w-full"
                  inputClass="!w-full !border-2 !border-slate-200 !rounded-full !pl-14 !pr-4 !py-4 !text-sm !h-auto focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-100"
                  buttonClass="!border-2 !border-slate-200 !rounded-full !bg-white"
                  dropdownClass="!text-slate-900"
                  countryCodeEditable={false}
                  enableSearch
                  inputProps={{ inputMode: 'numeric', autoComplete: 'tel' }}
                />
              </div>
              <button
                className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-xl"
                type="submit"
                disabled={inlineStatus === 'loading'}
              >
                {inlineStatus === 'loading' ? 'Yuborilmoqda...' : 'Yuborish'}
              </button>
            </form>
            {inlineMessage && (
              <div className={`mt-4 rounded-2xl px-4 py-3 text-center text-sm font-semibold ${inlineStatus === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {inlineMessage}
              </div>
            )}
            <p className="mt-3 text-center text-xs text-slate-500">
              Ariza qoldiring va mutaxassislarimiz siz bilan bog‘lanadi.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto w-full max-w-6xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Psorinormga ishonch bildirgan mutaxassislar va mashhur insonlar tajribasini ko‘ring!
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Saida Rametova', url: 'https://www.youtube.com/embed/vZrr2F3WRN8' },
              { name: 'Ra’no Zokirova', url: 'https://www.youtube.com/embed/OvbV4CFL3Gk' },
              { name: 'Abdulla Qurbonov', url: 'https://www.youtube.com/embed/4X8XUdJw88c' },
              { name: 'Dermatovenerolog Shoxruh', url: 'https://www.youtube.com/embed/uIpvZ27lLuw' }
            ].map((item) => (
              <div key={item.name} className="space-y-4">
                <div className="overflow-hidden rounded-[2rem] shadow-2xl transition hover:-translate-y-1">
                  <iframe
                    className="aspect-[9/16] w-full"
                    src={item.url}
                    title={item.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-[30px] font-semibold text-slate-900">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="bg-white px-6 py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">PSORINORM</span> tarkibi
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Psorinorm tarkibi 10 dan ortiq tabiiy komponentlardan tashkil topgan
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-[1fr,1.2fr,1fr]">
            <div className="space-y-6">
              <div className="rounded-2xl bg-slate-50 px-5 py-4 shadow-soft">
                <p className="text-sm font-semibold text-slate-900">Choy daraxti</p>
                <p className="text-xs text-slate-500">Yallig‘lanishni yengillashtirishga yordam beradi</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-5 py-4 shadow-soft">
                <p className="text-sm font-semibold text-slate-900">Salidol</p>
                <p className="text-xs text-slate-500">Teri qobig‘ini yumshatishga ko‘maklashadi</p>
              </div>
            </div>

            <div className="relative flex items-center justify-center animate-fade-up">
              <div className="absolute h-[360px] w-[360px] rounded-full border border-blue-200/60" />
              <div className="absolute h-[280px] w-[280px] rounded-full border border-blue-200/40" />
              <img
                className="relative h-[420px] w-[320px] rounded-[2.5rem] object-contain drop-shadow-2xl animate-float"
                src={psorinormProduct}
                alt="Psorinorm mahsuloti"
                loading="lazy"
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-slate-50 px-5 py-4 shadow-soft">
                <p className="text-sm font-semibold text-slate-900">Naftalan</p>
                <p className="text-xs text-slate-500">Teri tiklanishini qo‘llab-quvvatlaydi</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-5 py-4 shadow-soft">
                <p className="text-sm font-semibold text-slate-900">O‘simlik ekstrakti</p>
                <p className="text-xs text-slate-500">Namlik balansini saqlashga yordam beradi</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="max-w-3xl text-slate-600">
              Mahsulot tarkibi haqida to‘liq ma’lumot olishni istasangiz, ma’lumotlaringizni qoldiring.
              Mutaxassis batafsil tushuntiradi va individual tavsiya beradi.
            </p>
            <button
              className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-xl"
              onClick={() => setModalOpen(true)}
            >
              Tarkib haqida bilish
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto w-full max-w-6xl rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-cyan-500 p-10 text-white shadow-2xl">
          <div className="grid gap-10 md:grid-cols-[1.2fr,1fr]">
            <div>
              <h2 className="text-3xl font-bold">Bugunoq buyurtma bering</h2>
              <p className="mt-3 text-blue-100">Psoriaz alomatlarini yengillashtirishga yordam beruvchi kursni boshlang.</p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
                <span className="rounded-full bg-white/10 px-4 py-2">✔ Bepul konsultatsiya</span>
                <span className="rounded-full bg-white/10 px-4 py-2">✔ Tezkor yetkazish</span>
                <span className="rounded-full bg-white/10 px-4 py-2">✔ Maxfiy qadoqlash</span>
              </div>
            </div>
            {renderCtaForm()}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-gradient-to-br from-blue-600 to-cyan-500 px-6 py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Mahsulotdan foydalangan mijozlar fikri</h2>
            <p className="mt-4 text-blue-100">Video va rasmli real taassurotlar.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((item) => (
              <article key={item.name} className="overflow-hidden rounded-[2.5rem] bg-white/10 p-3 text-white shadow-2xl backdrop-blur border border-white/20 transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.35)]">
                {item.video ? (
                  <video
                    className="aspect-[9/19.5] w-full rounded-[2rem] object-cover bg-black/20"
                    controls
                    preload="metadata"
                    src={item.video}
                  />
                ) : (
                  <div className="flex aspect-[9/19.5] w-full items-center justify-center rounded-[2rem] bg-white/10 text-sm font-semibold text-blue-100">
                    Video yuklanmoqda
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-gradient-to-br from-slate-50 to-blue-50 px-6 py-20">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Aloqa</span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Bepul konsultatsiya oling</h2>
            <p className="mt-4 text-slate-600">Formani to‘ldiring, biz siz bilan tez orada bog‘lanamiz.</p>
          </div>
          {renderContactForm()}
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Tez-tez so‘raladigan savollar</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'Psorinorm haqiqatan ham psoriaz, ekzema va dermatitdan 15 kunda xalos qiladimi?',
                a: 'Ha, ko‘pchilik mijozlarimiz 15 kun ichida ijobiy natijalarni sezadi. Terining yangilanishi individual jarayon bo‘lib, ba’zi odamlarda natija tezroq, ba’zilarida esa biroz uzoqroq vaqt talab qilishi mumkin. Muhimi, mahsulotni muntazam qo‘llash va tavsiya etilgan kursni to‘liq tugatishdir.'
              },
              {
                q: 'Agar Psorinorm natija bermasa, pulimni qaytarib olsam bo‘ladimi?',
                a: 'Albatta! Biz mahsulotimiz sifatiga 100% kafolat beramiz. Agar siz yo‘riqnoma asosida to‘liq ishlatib, mahsulotdan kutilgan natijani olmasangiz, pulingizni to‘liq qaytarib beramiz.'
              },
              {
                q: 'Psorinorm qanday tarkibga ega? Ichida kimyoviy modda bormi?',
                a: 'Yo‘q, Psorinorm 100% tabiiy tarkibiy qismlardan iborat bo‘lib, hech qanday zararli kimyoviy moddalar yoki gormonal vositalarni o‘z ichiga olmaydi.'
              },
              {
                q: 'Qanday qilib buyurtma bersam bo‘ladi va qancha muddatda yetkaziladi?',
                a: `Buyurtma berish juda oson:
1. Saytimizda ism va telefon raqamingizni qoldiring.
2. Menejerimiz siz bilan tezda bog‘lanadi va barcha tafsilotlarni aniqlashtiradi.
3. Buyurtmangiz 1-3 kun ichida yetkazib beriladi!`
              }
            ].map((item) => (
              <details key={item.q} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
                <summary className="flex cursor-pointer list-none items-center justify-between text-left text-base font-semibold text-slate-900">
                  {item.q}
                  <span className="ml-4 text-2xl text-blue-500 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 px-6 py-12 text-slate-300">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6">
          <div>
            <strong className="text-lg bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">PSORINORM</strong>
            <span className="block text-sm text-slate-400">2026</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-slate-200 transition hover:bg-white/20"
              href="https://t.me/psorinorm_uz"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.8 5.1c.4-1.6-1.3-2.8-2.7-2.2L3.4 9.3c-1.5.6-1.5 2.7.1 3.2l4.2 1.4 1.6 5.1c.3 1 1.6 1.3 2.3.5l2.4-2.8 4.1 3c.9.6 2.1.1 2.4-.9l3.3-13.7Zm-5.3 10.1-2.7-2.1 3.3-5.1c.3-.5-.3-1.1-.8-.7L9 13.5l-3.4-1.2 12.4-4.8-1.5 7.7Z" />
              </svg>
            </a>
            <a
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-slate-200 transition hover:bg-white/20"
              href="https://www.instagram.com/psorinorm.uz?igsh=ZGR6ZDEwcHV4b3d1&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5Zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5Zm5-3.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
              </svg>
            </a>
            <a
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-slate-200 transition hover:bg-white/20"
              href="https://www.youtube.com/@pzoriazegzemadermatitkas-ss8sd"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.5 12 4.5 12 4.5s-5.6 0-7.5.6a3 3 0 0 0-2.1 2.1 31 31 0 0 0-.4 4.8c0 1.6.1 3.2.4 4.8a3 3 0 0 0 2.1 2.1c1.9.6 7.5.6 7.5.6s5.6 0 7.5-.6a3 3 0 0 0 2.1-2.1c.3-1.6.4-3.2.4-4.8a31 31 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
              </svg>
            </a>
          </div>
          <div className="max-w-sm text-sm text-slate-400">
            Eslatma: davolash bo‘yicha yakuniy qaror shifokor tavsiyasiga bog‘liq.
          </div>
        </div>
      </footer>
    </div>
  );
}
