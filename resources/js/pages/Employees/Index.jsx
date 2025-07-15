import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import 'bootstrap/dist/css/bootstrap.min.css';

console.log("EMPLOYEES", employees);


export default function Index({ employees, filters  } ) {
  const [searchDept, setSearchDept] = useState(filters.department || '');
  const [searchPos, setSearchPos] = useState(filters.position || '');

  const { data, setData, post, reset } = useForm({
    name: '', position: '', salary: '', department: '', profile_photo: null
  });

  const submit = (e) => {
    e.preventDefault();
    post('/employees', { forceFormData: true });
  };

  const handleSearch = () => {
    router.get('/employees', { department: searchDept, position: searchPos });
  };

  return (
    <div className="container mt-5">
      <h2>ระบบจัดการพนักงาน</h2>

      {/* ฟอร์มค้นหา */}
      <div className="row my-3">
        <div className="col">
          <input value={searchDept} onChange={e => setSearchDept(e.target.value)} className="form-control" placeholder="แผนก" />
        </div>
        <div className="col">
          <input value={searchPos} onChange={e => setSearchPos(e.target.value)} className="form-control" placeholder="ตำแหน่ง" />
        </div>
        <div className="col">
          <button onClick={handleSearch} className="btn btn-info">ค้นหา</button>
        </div>
      </div>

      {/* ฟอร์มเพิ่มพนักงาน */}
      <form onSubmit={submit} encType="multipart/form-data" className="row g-2 mb-4">
        <div className="col-md-2"><input className="form-control" placeholder="ชื่อ" onChange={e => setData('name', e.target.value)} /></div>
        <div className="col-md-2"><input className="form-control" placeholder="ตำแหน่ง" onChange={e => setData('position', e.target.value)} /></div>
        <div className="col-md-2"><input type="number" className="form-control" placeholder="เงินเดือน" onChange={e => setData('salary', e.target.value)} /></div>
        <div className="col-md-2"><input className="form-control" placeholder="แผนก" onChange={e => setData('department', e.target.value)} /></div>
        <div className="col-md-2"><input type="file" className="form-control" onChange={e => setData('profile_photo', e.target.files[0])} /></div>
        <div className="col-md-2"><button className="btn btn-success">เพิ่ม</button></div>
      </form>

      {/* ตารางพนักงาน */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>รูป</th>
            <th>ชื่อ</th>
            <th>ตำแหน่ง</th>
            <th>แผนก</th>
            <th>เงินเดือน</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>
                {emp.profile_photo &&
                  <img src={`/storage/${emp.profile_photo}`} alt="profile" style={{ width: 50, height: 50, objectFit: 'cover' }} />}
              </td>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => router.delete(`/employees/${emp.id}`)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
